const myVersion = "0.4.0", myProductName = "newsproduct";  

const fs = require ("fs");
const request = require ("request"); 
const utils = require ("daveutils");
const opml = require ("opml"); 
const daveappserver = require ("daveappserver"); 
const davesql = require ("davesql"); //9/25/22 by DW
const database = require ("feedlanddatabase"); //9/25/22 by DW

var config = {
	flExpandIncludes: false,
	urlNewsProductSource: "http://scripting.com/code/riverclient/index.html"
	};
var stats = {
	}

function httpRequest (url, timeout, headers, callback) {
	request (url, function (err, response, data) {
		if (err) {
			callback (err);
			}
		else {
			if (response.statusCode != 200) {
				const message = "The request returned a status code of " + response.statusCode + ".";
				callback ({message});
				}
			else {
				callback (undefined, data) 
				}
			}
		});
	}
function httpReadOutline (urlOpmlFile, callback) {
	httpRequest (urlOpmlFile, undefined, undefined, function (err, opmltext) {
		if (err) {
			callback (err);
			}
		else {
			opml.parse (opmltext, function (err, theOutline) {
				if (err) {
					callback (err);
					}
				else {
					callback (undefined, theOutline);
					}
				});
			}
		})
	}
function readObject (f, theConfig, callback) { 
	utils.sureFilePath (f, function () {
		fs.readFile (f, function (err, jsontext) {
			if (!err) {
				try {
					var jstruct = JSON.parse (jsontext);
					for (var x in jstruct) {
						theConfig [x] = jstruct [x];
						}
					}
				catch (err) {
					console.log ("readObject: f = " + f + ", err.message == " + err.message);
					}
				}
			callback ();
			});
		});
	}
function everyMinute () {
	}
function everySecond () {
	}
function handleHttpRequest (theRequest) {
	var now = new Date ();
	const params = theRequest.params;
	const token = params.oauth_token;
	const secret = params.oauth_token_secret;
	function returnPlainText (s) {
		theRequest.httpReturn (200, "text/plain", s.toString ());
		}
	function returnHtml (htmltext) {
		theRequest.httpReturn (200, "text/html", htmltext);
		}
	function returnData (jstruct) {
		if (jstruct === undefined) {
			jstruct = {};
			}
		theRequest.httpReturn (200, "application/json", utils.jsonStringify (jstruct));
		}
	function returnError (jstruct) {
		theRequest.httpReturn (500, "application/json", utils.jsonStringify (jstruct));
		}
	function returnOpml (err, opmltext) {
		if (err) {
			returnError (err);
			}
		else {
			theRequest.httpReturn (200, "text/xml", opmltext);
			}
		}
	function httpReturn (err, jstruct) {
		if (err) {
			returnError (err);
			}
		else {
			returnData (jstruct);
			}
		}
	function returnUserNewsProduct (screenname) { //9/25/22 by DW
		function checkUndefined (val) {
			if (val === undefined) {
				return ("");
				}
			else {
				return (val);
				}
			}
		database.getUserPrefs (screenname, function (err, thePrefs) {
			if (err) {
				returnError (err);
				}
			else {
				if (thePrefs.emailSecret !== undefined) { //1/17/23 by DW
					delete thePrefs.emailSecret;
					}
				console.log ("returnUserNewsProduct: thePrefs == " + utils.jsonStringify (thePrefs));
				const newsProductInfo = {
					screenname,
					categories: thePrefs.newsproductCategoryList,
					title: thePrefs.newsproductTitle,
					description: thePrefs.newsproductDescription,
					image: thePrefs.newsproductImage,
					style: thePrefs.newsproductStyle,
					script: thePrefs.newsproductScript
					}
				const pagetable = {
					screenname, 
					
					userPrefs: utils.jsonStringify (thePrefs),
					
					pageTitle: checkUndefined (newsProductInfo.title),
					pageDescription: checkUndefined (newsProductInfo.description),
					pageImage: checkUndefined (newsProductInfo.image),
					
					productname: config.productName,
					productnameForDisplay: config.productnameForDisplay,
					version: myVersion,
					urlServerForClient: config.urlFeedlandServer, //1/16/23 by DW
					urlWebsocketServerForClient: undefined,
					flEnableLogin: undefined,
					prefsPath: undefined,
					docsPath: undefined,
					theOutlineInJson: undefined
					}
				
				console.log ("returnUserNewsProduct: newsProductInfo == " + utils.jsonStringify (newsProductInfo));
				console.log ("returnUserNewsProduct: pagetable == " + utils.jsonStringify (pagetable)); //1/17/23 by DW
				
				request (config.urlNewsProductSource, function (err, response, templatetext) {
					if (!err && response.statusCode == 200) {
						const pagetext = utils.multipleReplaceAll (templatetext.toString (), pagetable, false, "[%", "%]");
						returnHtml (pagetext);
						}
					});
				}
			});
		return (true);
		}
	function callWithScreenname (callback) {
		davetwitter.getScreenName (token, secret, function (screenname) {
			if (screenname === undefined) {
				returnError ({message: "Can't do the thing you want because the accessToken is not valid."});    
				}
			else {
				callback (screenname);
				}
			});
		}
	switch (theRequest.method) {
		case "GET":
			let screenname = utils.stringDelete (theRequest.lowerpath, 1, 1);
			if (screenname.length > 0) { //something like /bullmancuso
				if (utils.endsWith (screenname, "/")) {
					screenname = utils.stringMid (screenname, 1, screenname.length - 1);
					}
				returnUserNewsProduct (screenname);
				return (true); //consumed
				}
			else {
				return (false); //handle elsewhere
				}
			break;
		}
	return (false); //not consumed
	}
function asyncAddMacroToPagetable (pagetable, theRequest, callback) {
	pagetable.urlTemplate = theRequest.params.template;
	if (pagetable.urlTemplate === undefined) {
		pagetable.urlTemplate = "http://scripting.com/publicfolder/feedland/rivers/firstTabbedRiver.opml"
		}
	httpReadOutline (pagetable.urlTemplate, function (err, theOutline) {
		function getHeadAtt (name) {
			var attval = "";
			try {
				if (theOutline.opml.head [name] !== undefined) {
					attval = theOutline.opml.head [name];
					}
				}
			catch (err) {
				}
			return (attval);
			}
		pagetable.pageTitle = getHeadAtt ("title");
		pagetable.pageDescription = getHeadAtt ("description");
		
		var imageUrl = getHeadAtt ("image");
		if (imageUrl.length != 0) {
			pagetable.pageImage = "<img src=\"" + imageUrl + "\">";
			}
		else {
			pagetable.pageImage = "";
			}
		
		if (config.flExpandIncludes) { //8/22/22 by DW
			opml.expandIncludes (theOutline, function (theNewOutline) { //8/11/22 by DW
				pagetable.theOutlineInJson = utils.jsonStringify (theNewOutline);
				callback ();
				});
			}
		else {
			pagetable.theOutlineInJson = utils.jsonStringify (theOutline);
			callback ();
			}
		});
	}
function addMacroToPagetable (pagetable, theRequest) {
	pagetable.pageTitle = pagetable.productNameForDisplay;
	pagetable.urlTemplate = theRequest.params.template;
	pagetable.newsProductInfo = "undefined"; //9/25/22 by DW -- allows us to use the same riverClient in the CNAME version and in the outline-based version.
	if (pagetable.urlTemplate === undefined) {
		pagetable.urlTemplate = "http://scripting.com/publicfolder/feedland/rivers/firstTabbedRiver.opml"
		}
	pagetable.userPrefs = "undefined"; //9/29/22 by DW
	pagetable.urlServerForClient = config.urlFeedlandServer; //1/17/23 by DW
	}
function startup () {
	readObject ("config.json", config, function () {
		console.log ("config == " + utils.jsonStringify (config));
		var options = {
			everySecond,
			everyMinute,
			httpRequest: handleHttpRequest,
			addMacroToPagetable,
			asyncAddMacroToPagetable
			}
		daveappserver.start (options, function (appConfig) {
			for (var x in appConfig) {
				config [x] = appConfig [x];
				}
			davesql.start (config.database, function () {
				database.start (config, function () {
					});
				});
			});
		});
	}
startup ();
