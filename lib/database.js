var myProductName = "feedlandDatabase", myVersion = "0.4.25";  

exports.start = start;
exports.addSubscription = addSubscription;
exports.deleteSubscription = deleteSubscription;
exports.getUserSubcriptions = getUserSubcriptions;
exports.checkFeedAndItems = checkFeedAndItems;
exports.checkOneFeed = checkOneFeed;
exports.processSubscriptionList = processSubscriptionList;
exports.updateNextFeedIfReady = updateNextFeedIfReady;
exports.getUpdatedFeed = getUpdatedFeed;
exports.getDatabaseFeed = getDatabaseFeed;
exports.getFeed = getFeed;
exports.getRiver = getRiver;
exports.deleteItem = deleteItem; //4/22/22 by DW
exports.saveFeed = saveFeed; //4/28/22 by DW
exports.saveItem = saveItem; 
exports.convertDatabaseFeed = convertDatabaseFeed;
exports.convertDatabaseItem = convertDatabaseItem;
exports.isFeedInDatabase = isFeedInDatabase;
exports.isItemInDatabase = isItemInDatabase;
exports.updateSocketSubscribers = updateSocketSubscribers;
exports.getNexItemtId = getNexItemtId;
exports.getItemFromDatabase = getItemFromDatabase; //5/7/22 by DW
exports.getFollowers = getFollowers; //5/18/22 by DW
exports.isUserSubscribed = isUserSubscribed; //5/18/22 by DW
exports.setFeedSubsCount = setFeedSubsCount; //5/21/22 by DW
exports.subscribeToFeed = subscribeToFeed; //5/27/22 by DW
exports.getRecentSubscriptions = getRecentSubscriptions; //7/23/22 by DW
exports.getRiverFromList = getRiverFromList; //8/3/22 by DW
exports.getRiverFromOpml = getRiverFromOpml; //8/21/22 by DW
exports.backupDatabase = backupDatabase; //8/22/22 by DW
exports.getFeedItems = getFeedItems; //8/31/22 by DW
exports.setCategoriesForSubscription = setCategoriesForSubscription; //9/4/22 by DW

exports.getSubscriptions = getSubscriptions; //moved from viewers.js -- 9/6/22 by DW
exports.getUsersOpmlUrl = getUsersOpmlUrl; //moved from viewers.js -- 9/6/22 by DW
exports.getUserOpmlSubscriptions = getUserOpmlSubscriptions; //moved from viewers.js -- 9/6/22 by DW
exports.getHotlist = getHotlist; //moved from viewers.js -- 9/6/22 by DW
exports.getHotlistOpml = getHotlistOpml; //moved from viewers.js -- 9/6/22 by DW
exports.getFeedSearch = getFeedSearch; //12/26/22 by DW

exports.isUserInDatabase = isUserInDatabase; //9/16/22 by DW
exports.setUserPrefs = setUserPrefs; //9/16/22 by DW
exports.getAllUsers = getAllUsers; //9/16/22 by DW
exports.getUserCategories = getUserCategories; //9/19/22 by DW
exports.getUserPrefs = getUserPrefs; //9/26/22 by DW

exports.getRiverFromCategory = getRiverFromCategory; //9/15/22 by DW
exports.getFeedsInCategory = getFeedsInCategory; //9/19/22 by DW
exports.getRiverFromEverything = getRiverFromEverything; //10/14/22 by DW
exports.getRiverFromHotlist = getRiverFromHotlist; //10/15/22 by DW
exports.getRiverFromUserFeeds = getRiverFromUserFeeds; //12/3/22 by DW

exports.isLiked = isLiked; //9/17/22 by DW
exports.toggleItemLike = toggleItemLike; //9/17/22 by DW
exports.getLikes = getLikes; //9/17/22 by DW
exports.buildLikesFeed = buildLikesFeed; //9/17/22 by DW

exports.renewNextSubscriptionIfReady = renewNextSubscriptionIfReady; //10/9/22 by DW
exports.renewFeedNow = renewFeedNow; //10/9/22 by DW

exports.getCurrentRiverBuildLog = getCurrentRiverBuildLog; //10/10/22 by DW


const fs = require ("fs");
const md5 = require ("md5");
const marked = require ("marked"); //8/25/22 by DW
const sanitizeHtml = require ("sanitize-html"); //9/11/22 by DW
const utils = require ("daveutils");
const davesql = require ("davesql");
const opml = require ("opml");
const reallysimple = require ("reallysimple");
const request = require ("request"); //8/21/22 by DW
const rss = require ("daverss"); //9/17/22 by DW
const s3 = require ("daves3");
const davegithub = require ("davegithub"); //9/30/22 by DW

var config = {
	flEnableNewUsers: true, //12/12/22 by DW
	maxRiverItems: 100,
	maxFeedUrlLength: 512,
	flUpdateFeedsInBackground: true,
	minSecsBetwIndividualFeedCheck: 60 * 5, //7/7/22 by DW
	maxLengthFeedTitle: 255,
	maxLengthFeedDescription: 512, 
	maxFeedMetadata: 255, //copyright, generator, language, managingEditor, etc
	maxGuidLength: 255,
	maxListNameLength: 255,
	flSkipDuplicateTitles: true,
	flMaintainFeedsOpml: false, //7/3/22 by DW
	maxNewFeedSubscriptions: 100, //7/20/22 by DW
	maxRecentSubscriptions: 250, //7/23/22 by DW
	backupFolder: "data/backups/", //8/22/22 by DW
	
	flCheckZeroSubsFeeds: true, //8/31/22 by DW
	
	maxRssItems: 25, //9/17/22 by DW
	
	s3LikesPath: "/data.feedland.org/likes/", //10/27/22 by DW
	
	githubBackup: { //9/30/22 by DW
		enabled: true,
		username: "scripting",
		repo: "test1",
		basepath: "server/",
		password: "", //overwritten when we load config.json
		committer: {
			name: "Dave Winer",
			email: "dave.winer@gmail.com"
			},
		message: "Backup of FeedLand server",
		userAgent: ""
		},
	flRiverBuildLogEnabled: true, //10/10/22 by DW
	riverBuildLogFolder: "data/riverBuildLogs/",
	
	blockedUsers: [
		"AndySylvester99.xml"
		],
	
	getUserOpmlSubscriptions: function (username, catname, callback) { //6/27/22 by DW
		},
	getStats: function () { //6/27/22 by DW
		return ({});
		},
	notifySocketSubscribers: function (verb, payload, flPayloadIsString, callbackToQualify) { //6/27/22 by DW
		},
	saveStats: function (theStats) { //6/27/22 by DW
		},
	writeWholeFile: function (screenname, relpath, filetext, callback) { //6/27/22 by DW
		callback ();
		},
	readWholeFile: function (screenname, relpath, callback) { //7/3/22 by DW
		callback ({message: "The file was not read."});
		},
	buildUsersFeed: function (screenname, callback) { //11/6/22 by DW
		if (callback !== undefined) {
			callback (undefined);
			}
		}
	};
var stats = {
	itemSerialNum: 1
	};

var riverCache = new Object (); //8/22/22 by DW
const flUseRiverCache = true; //9/14/22 by DW -- https://github.com/scripting/feedlandSupport/issues/54
const ctSecsLifeRiverCache = 5 * 60; //cached rivers age-out after 5 minutes

var riverBuildLog = new Array (); //10/10/22 by DW
var flRiverBuildLogChanged = false;

function initStats () {
	const appStats = config.getStats ();
	if (appStats.itemSerialNum !== undefined) {
		stats.itemSerialNum = appStats.itemSerialNum;
		}
	}
function notNull (val) {
	if (val === undefined) {
		return (false);
		}
	if (val == null) {
		return (false);
		}
	return (true);
	}
function checkNull (val) {
	if (notNull (val)) {
		return (val);
		}
	return (undefined);
	}
function removeNullValuesFromObject (obj) { //9/26/22 by DW
	for (var x in obj) { 
		if (obj [x] == null) {
			obj [x] = undefined;
			}
		}
	return (obj);
	}
function removeNullValues (result) { //9/6/22 by DW
	result.forEach (function (sub) {
		for (var x in sub) { 
			if (sub [x] == null) {
				sub [x] = undefined;
				}
			}
		});
	}
function buildParamList (paramtable) { //12/10/22 by DW
	if (paramtable === undefined) {
		return ("");
		}
	else {
		var s = "";
		for (var x in paramtable) {
			if (paramtable [x] !== undefined) { //8/4/21 by DW
				if (s.length > 0) {
					s += "&";
					}
				s += x + "=" + encodeURIComponent (paramtable [x]);
				}
			}
		return (s);
		}
	}
function convertCategories (sub) { //9/6/22 by DW
	if ((sub.categories === undefined) || (sub.categories === null)) { 
		sub.categories = JSON.stringify ([]);
		}
	else {
		var splits = sub.categories.split (","), catsarray = new Array ();
		splits.forEach (function (cat) {
			if (cat.length > 0) {
				catsarray.push (cat);
				}
			});
		sub.categories = JSON.stringify (catsarray);
		}
	return (sub);
	}
function markdownProcess (markdowntext) { //8/25/22 by DW
	var htmltext = marked.parse (markdowntext);
	return (htmltext);
	}
function httpReadUrl (url, callback) { //8/21/22 by DW
	request (url, function (err, response, data) {
		if (err) {
			callback (err);
			}
		else {
			if (response.statusCode != 200) {
				const errstruct = {
					message: "Can't read the URL, \"" + url + "\" because we received a status code of " + response.statusCode + ".",
					statusCode: response.statusCode
					};
				callback (errstruct);
				}
			else {
				callback (undefined, data);
				}
			}
		});
	}
function requestWithRedirect (theRequest, callback) { //12/11/22 by DW
	var myRequest = new Object ();
	for (var x in theRequest) {
		myRequest [x] = theRequest [x];
		}
	myRequest.followAllRedirects = false; //we're doing this ourselves
	myRequest.maxRedirects = (myRequest.maxRedirects === undefined) ? 0 : myRequest.maxRedirects;
	request (myRequest, function (err, response, body) {
		if (err) { //1/1/23 by DW
			callback (err, response, body);
			}
		else {
			const code = response.statusCode;
			if ((code == 301) || (code == 302)) { //redirect
				if (myRequest.maxRedirects == 0) {
					callback (err, response, body);
					}
				else {
					myRequest.maxRedirects--;
					myRequest.url = response.headers.location;
					requestWithRedirect (myRequest, callback);
					}
				}
			else {
				callback (err, response, body);
				}
			}
		});
	}
function getOutlineFromOpml (urlOpml, callback) { //8/21/22 by DW
	httpReadUrl (urlOpml, function (err, opmltext) {
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
		});
	}
function notComment (item) { //8/21/22 by DW
	return (!utils.getBoolean (item.isComment));
	}
function maxStringLength (theString, max) {
	if ((theString === undefined) || (theString === null)) {
		theString = "";
		}
	if (theString.length > max) { //1/27/19 by DW
		theString = utils.stringMid (theString, 1, max);
		}
	return (theString);
	}
function updateSocketSubscribers (verb, jstruct, callback) {
	const jsontext = utils.jsonStringify (jstruct);
	config.notifySocketSubscribers (verb, jsontext, true, function (conn) {
		return (true); //we're sending every update to every user, later we could narrow this to users who are subscribed
		});
	}
function getItemGuid (item) {
	var guid = "";
	function ok (val) {
		if (val !== undefined) {
			if (val != "null") {
				return (true);
				}
			}
		return (false);
		}
	if (ok (item.guid)) {
		guid = item.guid;
		}
	else {
		if (ok (item.pubDate)) {
			guid += item.pubDate;
			}
		if (ok (item.link)) {
			guid += item.link;
			}
		if (ok (item.title)) {
			guid += item.title;
			}
		if (guid.length > 0) {
			guid = md5 (guid);
			}
		}
	guid = maxStringLength (guid, config.maxGuidLength);
	return (guid);
	}
function stripMarkup (s) { //9/11/22 by DW
	const legalTags = {
		allowedTags: [
			"p", "br"
			],
		allowedAttributes: {
			}
		};
	if ((s === undefined) || (s == null) || (s.length == 0)) {
		return ("");
		}
	return (sanitizeHtml (s, legalTags));
	}
function getItemDescription (item) { //5/28/22 by DW
	var description;
	if (item.markdowntext === undefined) {
		description = item.description;
		description = stripMarkup (description); //9/11/22 by DW
		description = utils.trimWhitespace (description);
		}
	else {
		description = markdownProcess (item.markdowntext); //11/8/22 by DW
		}
	return (description);
	}
function getItemPubdate (pubDate) { //8/26/22 by DW
	if (pubDate === undefined) {
		pubDate = now;
		}
	else {
		var now = new Date ();
		pubDate = new Date (pubDate);
		if (pubDate > now) {
			pubDate = now;
			}
		}
	return (pubDate);
	}
function getDatabaseFeed (feedUrl, callback) {
	var sqltext = "select * from feeds where feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			if (result.length == 0) {
				callback ({"message": "The feed is not in the database."});
				}
			else {
				callback (undefined, result [0]);
				}
			}
		});
	}
function changeDatabaseFeed (feedRec, callback) {
	const sqltext = "replace into feeds " + davesql.encodeValues (feedRec);
	davesql.runSqltext (sqltext, callback);
	}
function isItemInDatabase (feedUrl, guid, callback) {
	var sqltext = "select * from items where guid=" + davesql.encode (guid) + " and feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (false);
			}
		else {
			if (result.length == 0) {
				callback (false);
				}
			else {
				callback (true, result [0]);
				}
			}
		});
	}
function isFeedInDatabase (feedUrl, callback) {
	var sqltext = "select * from feeds where feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (false);
			}
		else {
			if (result.length == 0) {
				callback (false);
				}
			else {
				callback (true, result [0]);
				}
			}
		});
	}
function addSubscription (screenname, feedUrl, callback) {
	var subsRec = {
		listName: maxStringLength (screenname, config.maxListNameLength),
		feedUrl: maxStringLength (feedUrl, config.maxFeedUrlLength),
		categories: ",all,", //9/11/22 by DW
		whenUpdated: new Date ()
		};
	var sqltext = "replace into subscriptions " + davesql.encodeValues (subsRec);
	davesql.runSqltext (sqltext, function (err, result) {
		setFeedSubsCount (feedUrl, function (err, ctSubs) {
			if (callback !== undefined) {
				if (err) {
					callback (err);
					}
				else {
					console.log ("addSubscription: screenname == " + screenname + ", feedUrl == " + feedUrl);
					callback (undefined, result [0]);
					}
				}
			});
		});
	}
function deleteSubscription (screenname, feedUrl, callback) {
	var sqltext = "delete from subscriptions where listName=" + davesql.encode (screenname) + " and feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		setFeedSubsCount (feedUrl, function (err, ctSubs) {
			if (callback !== undefined) {
				if (err) {
					callback (err);
					}
				else {
					callback (undefined, true);
					}
				}
			});
		});
	}
function getUserSubcriptions (screenname, callback) {
	var sqltext = "select * from subscriptions where listName=" + davesql.encode (screenname) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			console.log ("getUserSubcriptions: err.message == " + err.message);
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			callback (undefined, result);
			}
		});
	}
function processSubscriptionList (screenname, theList, flDeleteEnabled=true, callback) {
	getUserSubcriptions (screenname, function (err, subs) {
		function deleteFromSubs (feedUrl) {
			var newsubs = new Array (), fldeleted = false;
			subs.forEach (function (item) {
				if (item.feedUrl == feedUrl) {
					fldeleted = true;
					}
				else {
					newsubs.push (item);
					}
				});
			subs = newsubs;
			return (fldeleted); //if true, you don't need to sub
			}
		theList.forEach (function (item) {
			if (!deleteFromSubs (item.xmlUrl)) {
				checkFeedAndItems (item.xmlUrl, function (err) {
					addSubscription (screenname, item.xmlUrl, function (err, result) {
						});
					});
				}
			});
		subs.forEach (function (item) { //each of the subscriptions that were not deleted
			if (flDeleteEnabled) {
				deleteSubscription (screenname, item.feedUrl, function (err, result) {
					});
				}
			});
		});
	theList.forEach (function (item) { //3/29/22 by DW
		isFeedInDatabase (item.xmlUrl, function (flInDatabase, feedRec2) {
			if (!flInDatabase) {
				const flNewFeed = true;
				checkFeedAndItems (item.xmlUrl, undefined, flNewFeed);  //5/17/22 by DW
				}
			});
		});
	}
function getNexItemtId () { //5/3/22 by DW
	var theId = stats.itemSerialNum++;
	config.saveStats (stats);
	return (theId);
	}
function saveItem (itemRec, callback) { 
	
	if (itemRec.enclosureLength !== undefined) { //1/10/23 by DW
		if (typeof itemRec.enclosureLength == "string") {
			if (itemRec.enclosureLength.length == 0) {
				itemRec.enclosureLength = 0;
				}
			}
		}
	
	var sqltext = "replace into items " + davesql.encodeValues (itemRec);
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			itemRec.id = result.insertId; //7/12/22 by DW
			clearCachedRivers (itemRec.feedUrl); //10/16/22 by DW
			callback (undefined, result);
			}
		});
	}
function getItemFromDatabase (id, callback) { //5/7/22 by DW
	var sqltext = "select * from items where id=" + davesql.encode (id) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			if (result.length == 0) {
				let err = {message: "Can't find the item with id == " + id + "."};
				callback (err);
				}
			else {
				callback (undefined, result [0]);
				}
			}
		});
	}
function deleteItem (id, callback) { //4/22/22 by DW
	getItemFromDatabase (id, function (err, itemRec) {
		if (err) {
			callback (err);
			}
		else {
			itemRec.flDeleted = true;
			saveItem (itemRec, function (err, data) {
				if (err) {
					callback (err);
					}
				else {
					var convertedRec = convertDatabaseItem (itemRec);
					updateSocketSubscribers ("deletedItem", convertedRec);
					callback (undefined, convertedRec);
					}
				});
			}
		});
	}
function saveFeed (feedRec, callback) {
	const sqltext = "replace into feeds " + davesql.encodeValues (feedRec);
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			if (callback !== undefined) {
				callback (undefined, feedRec);
				}
			}
		});
	}
function convertDatabaseItem (itemRec) { //convert database item to the item struct defined by the API
	function convertDate (d) {
		if ((d === undefined) || (d == null)) {
			return (undefined);
			}
		else {
			return (new Date (d).toUTCString ());
			}
		}
	var apiRec = {
		feedUrl: itemRec.feedUrl,
		guid: checkNull (itemRec.guid),
		title: checkNull (itemRec.title),
		link: checkNull (itemRec.link),
		description: checkNull (itemRec.description),
		id: itemRec.id,
		pubDate: convertDate (itemRec.pubDate),
		whenReceived: convertDate (itemRec.whenCreated), //when the database item was created
		whenUpdated: convertDate (itemRec.whenUpdated), //when the database item last changed
		likes: convertLikesToArray (itemRec.likes) //10/15/22 by DW
		}
	apiRec.ctLikes = apiRec.likes.length; //10/15/22 by DW
	if (notNull (itemRec.enclosureUrl)) {
		var length = undefined, type = undefined;
		if (itemRec.enclosureLength != null) {
			try {
				length = Number (itemRec.enclosureLength);
				}
			catch (err) {
				}
			}
		if (itemRec.enclosureType != null) {
			type = itemRec.enclosureType;
			}
		apiRec.enclosure = {
			url: itemRec.enclosureUrl,
			type,
			length
			};
		}
	if (notNull (itemRec.outlineJsontext)) {
		try {
			apiRec.outline = JSON.parse (itemRec.outlineJsontext);
			}
		catch (err) {
			}
		}
	if (notNull (itemRec.markdowntext)) { //5/5/22 by DW
		apiRec.markdowntext = itemRec.markdowntext;
		}
	if (apiRec.ctLikes === undefined) { //5/7/22 by DW
		apiRec.ctLikes = 0;
		}
	return (apiRec);
	}
function convertDatabaseFeed (feedRec) {
	function notNull (val) {
		if (val === undefined) {
			return (false);
			}
		if (val == null) {
			return (false);
			}
		return (true);
		}
	function checkNull (val) {
		if (notNull (val)) {
			return (val);
			}
		return (undefined);
		}
	function convertDate (d) {
		if ((d === undefined) || (d == null)) {
			return (undefined);
			}
		else {
			return (new Date (d).toUTCString ());
			}
		}
	var apiRec = {
		feedUrl: feedRec.feedUrl,
		title: checkNull (feedRec.title),
		link: checkNull (feedRec.htmlUrl),
		description: checkNull (feedRec.description),
		pubDate: convertDate (feedRec.pubDate),
		whenCreated: convertDate (feedRec.whenCreated),
		whenUpdated: convertDate (feedRec.whenUpdated),
		ctItems: checkNull (feedRec.ctItems), //5/22/22 by DW
		whoFirstSubscribed: checkNull (feedRec.whoFirstSubscribed), //7/20/22 by DW
		ctSubs: checkNull (feedRec.ctSubs),
		ctSecs: checkNull (feedRec.ctSecs),
		ctErrors: checkNull (feedRec.ctErrors),
		ctConsecutiveErrors: checkNull (feedRec.ctConsecutiveErrors),
		errorString: checkNull (feedRec.errorString),
		whenChecked: convertDate (feedRec.whenChecked), //4/3/22 by DW
		ctChecks: checkNull (feedRec.ctChecks),
		whenLastError: convertDate (feedRec.whenLastError),
		urlCloudServer: checkNull (feedRec.urlCloudServer),
		whenLastCloudRenew: convertDate (feedRec.whenLastCloudRenew),
		ctCloudRenews: checkNull (feedRec.ctCloudRenews),
		copyright: checkNull (feedRec.copyright),
		generator: checkNull (feedRec.generator),
		language: checkNull (feedRec.language),
		twitterAccount: checkNull (feedRec.twitterAccount),
		managingEditor: checkNull (feedRec.managingEditor),
		webMaster: checkNull (feedRec.webMaster),
		lastBuildDate: convertDate (feedRec.lastBuildDate),
		docs: checkNull (feedRec.docs),
		ttl: checkNull (feedRec.ttl),
		imageUrl: checkNull (feedRec.imageUrl),
		imageTitle: checkNull (feedRec.imageTitle),
		imageLink: checkNull (feedRec.imageLink),
		imageWidth: checkNull (feedRec.imageWidth),
		imageHeight: checkNull (feedRec.imageHeight),
		imageDescription: checkNull (feedRec.imageDescription),
		};
	return (apiRec);
	}
function convertItemList (queryResult) {
	var itemList = new Array ();
	queryResult.forEach (function (item) {
		itemList.push (convertDatabaseItem (item));
		});
	return (itemList);
	}
function getUpdatedFeed (feedUrl, callback) {
	checkFeedAndItems (feedUrl, function (err, theFeed, feedRec) {
		if (err) {
			callback (err);
			}
		else {
			const sqltext = "select * from items where flDeleted=false and feedUrl=" + davesql.encode (feedUrl) + " order by pubDate desc limit " + config.maxRiverItems + ";";
			davesql.runSqltext (sqltext, function (err, result) {
				if (err) {
					callback (err);
					}
				else {
					theFeed.items = convertItemList (result);
					callback (undefined, convertDatabaseFeed (theFeed));
					}
				});
			}
		});
	}
function recordFeedError (feedUrl, err) { //4/28/22 by DW
	isFeedInDatabase (feedUrl, function (flInDatabase, feedRec) {
		if (flInDatabase) {
			const now = new Date ();
			feedRec.whenChecked = now;
			feedRec.ctChecks++;
			feedRec.whenLastError = now; //7/1/22 by DW
			feedRec.ctErrors++;
			feedRec.ctConsecutiveErrors++;
			feedRec.errorString = err.message;
			saveFeed (feedRec);
			}
		});
	}
function countSubsForFeed (feedUrl, callback) {
	var sqltext = "select count(*) as theCount from subscriptions where feedUrl = " + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			callback (undefined, result [0].theCount);
			}
		});
	}
function setFeedSubsCount (feedUrl, callback) { //5/21/22 by DW
	isFeedInDatabase (feedUrl, function (flInDatabase, feedRec) {
		if (flInDatabase) {
			countSubsForFeed (feedUrl, function (err, ctSubs) {
				if (err) {
					if (callback !== undefined) {
						callback (err);
						}
					}
				else {
					if (ctSubs == feedRec.ctSubs) { //unchanged, no need to save
						if (callback !== undefined) {
							callback (undefined, ctSubs);
							}
						}
					else {
						feedRec.ctSubs = ctSubs;
						saveFeed (feedRec, function (err, data) { 
							if (err) {
								if (callback !== undefined) {
									callback (err);
									}
								}
							else {
								if (callback !== undefined) {
									callback (undefined, ctSubs);
									}
								}
							});
						}
					}
				});
			}
		});
	}
function countItemsForFeed (feedUrl, callback) {
	var sqltext = "select count(*) as theCount from items where feedUrl = " + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			callback (undefined, result [0].theCount);
			}
		});
	}
function setFeedItemsCount (feedUrl, callback) { //5/21/22 by DW
	isFeedInDatabase (feedUrl, function (flInDatabase, feedRec) {
		if (flInDatabase) {
			countItemsForFeed (feedUrl, function (err, ctItems) {
				if (err) {
					if (callback !== undefined) {
						callback (err);
						}
					}
				else {
					if (ctItems == feedRec.ctItems) { //unchanged, no need to save
						if (callback !== undefined) {
							callback (undefined, ctItems);
							}
						}
					else {
						feedRec.ctItems = ctItems;
						saveFeed (feedRec, function (err, data) { 
							if (err) {
								if (callback !== undefined) {
									callback (err);
									}
								}
							else {
								if (callback !== undefined) {
									callback (undefined, ctItems);
									}
								}
							});
						}
					}
				});
			}
		});
	}
function setFeedCounts (feedUrl, callback) { //7/13/22 by DW
	setFeedItemsCount (feedUrl, function () {
		setFeedSubsCount (feedUrl, callback);
		});
	}
function setupNewFeedRec (feedUrl, theFeed) {
	const whenstart = new Date ();
	const titlestring = maxStringLength (theFeed.title, config.maxLengthFeedTitle);
	const descriptionstring = maxStringLength (theFeed.description, config.maxLengthFeedDescription);
	
	function getUrlCloudServer (theFeed) {
		var url = undefined;
		if ((theFeed.cloud !== undefined) && (theFeed.cloud.type == "rsscloud")) {
			url = "http://" + theFeed.cloud.domain + ":" + theFeed.cloud.port + theFeed.cloud.path;
			}
		return (url);
		}
	function getTwitterScreenname () {
		var screenname = undefined;
		if (theFeed.accounts !== undefined) {
			if (theFeed.accounts.twitter !== undefined) {
				screenname = theFeed.accounts.twitter;
				}
			}
		return (screenname);
		}
	function getFeedMetadataString (theString) {
		if (theString === undefined) {
			return (undefined);
			}
		else {
			return (maxStringLength (theString, config.maxFeedMetadata));
			}
		}
	function getFeedMetadataLink (url) {
		if (url === undefined) {
			return (undefined);
			}
		else {
			return (maxStringLength (url, config.maxFeedUrlLength));
			}
		}
	function getFeedDate (theDate) {
		var d = new Date (theDate);
		if (d == "Invalid Date") {
			d = undefined;
			}
		return (d);
		}
	function getFeedMetadataNumber (theNumber) {
		var n = Number (theNumber);
		if (isNaN (n)) {
			n = undefined;
			}
		return (n);
		}
	var feedRec = {
		feedUrl: feedUrl,
		
		title: getFeedMetadataString (theFeed.title),
		htmlUrl: getFeedMetadataLink (theFeed.link),
		description: getFeedMetadataString (theFeed.description),
		
		pubDate: getFeedDate (theFeed.pubDate),
		
		whenCreated: whenstart,
		whenUpdated: whenstart,
		
		ctSubs: 0,
		ctSecs: theFeed.reader.ctSecsToRead, //7/2/22 by DW
		
		ctErrors: 0,
		ctConsecutiveErrors: 0,
		errorString: "",
		whenChecked: whenstart, //4/3/22 by DW
		ctChecks: 1, 
		whenLastError: new Date (0),
		
		urlCloudServer: getUrlCloudServer (theFeed),
		whenLastCloudRenew: new Date (0), //10/13/22 by DW
		ctCloudRenews: 0,
		
		copyright: getFeedMetadataString (theFeed.copyright),
		generator: getFeedMetadataString (theFeed.generator),
		language: getFeedMetadataString (theFeed.language),
		managingEditor: getFeedMetadataString (theFeed.managingEditor),
		webMaster: getFeedMetadataString (theFeed.webMaster),
		twitterAccount: getTwitterScreenname (), //4/3/22 by DW
		docs: getFeedMetadataString (theFeed.docs),
		
		imageUrl: getFeedMetadataLink (theFeed.imageUrl), //points to the img
		imageTitle: getFeedMetadataString (theFeed.imageTitle),
		imageLink: getFeedMetadataLink (theFeed.imageLink),
		imageWidth: getFeedMetadataNumber (theFeed.imageWidth),
		imageHeight: getFeedMetadataNumber (theFeed.imageHeight),
		imageDescription: getFeedMetadataString (theFeed.imageDescription)
		};
	return (feedRec);
	}
function checkFeed (feedUrl, callback) { 
	function callbackWithError (message) {
		if (callback !== undefined) {
			callback ({message});
			}
		}
	const whenstart = new Date ();
	if (feedUrl === undefined) {
		callbackWithError ("Can't check the feed because the URL is undefined.");
		return;
		}
	if (feedUrl.length > config.maxFeedUrlLength) {
		callbackWithError ("Can't check the feed because the URL is too long, max length is " + config.maxFeedUrlLength + ".");
		return;
		}
	
	if (feedUrl == "http://tweetfeed.org/cluelessnewbie/rss.xml") { //8/25/22 by DW
		console.log ("set breakpoint here.");
		}
	
	reallysimple.readFeed (feedUrl, function (err, theFeed) {
		if (err) {
			if (callback !== undefined) {
				recordFeedError (feedUrl, err); //4/28/22 by DW
				callback (err);
				}
			}
		else {
			var feedRec = setupNewFeedRec (feedUrl, theFeed); //5/27/22 by DW
			isFeedInDatabase (feedUrl, function (flInDatabase, feedRec2) {
				var flChanged = !flInDatabase;
				if (flInDatabase) {
					feedRec.whenCreated = feedRec2.whenCreated;
					feedRec.whenUpdated = feedRec2.whenUpdated;
					feedRec.ctErrors = feedRec2.ctErrors;
					feedRec.ctConsecutiveErrors = 0; //7/1/22 by DW
					feedRec.errorString = feedRec2.errorString;
					feedRec.ctChecks = feedRec2.ctChecks;
					feedRec.whenLastError = feedRec2.whenLastError;
					feedRec.whenLastCloudRenew = feedRec2.whenLastCloudRenew;
					feedRec.ctCloudRenews = feedRec2.ctCloudRenews;
					feedRec.ctSubs = feedRec2.ctSubs; //7/8/22 by DW
					feedRec.ctItems = feedRec2.ctItems; //7/10/22 by DW
					feedRec.whoFirstSubscribed = feedRec2.whoFirstSubscribed; //7/20/22 by DW
					
					function checkChange (name, flDateType=false) {
						if (flDateType) {
							function convert (d) {
								return (new Date (d).toUTCString ());
								}
							if (convert (feedRec [name]) != convert (feedRec2 [name])) {
								flChanged = true;
								}
							}
						else {
							if (feedRec [name] != feedRec2 [name]) {
								flChanged = true;
								}
							}
						}
					checkChange ("title");
					checkChange ("htmlUrl");
					checkChange ("description");
					checkChange ("pubDate", true);
					checkChange ("urlCloudServer");
					checkChange ("copyright");
					checkChange ("generator");
					checkChange ("language");
					checkChange ("managingEditor");
					checkChange ("webMaster");
					checkChange ("docs");
					checkChange ("imageUrl");
					checkChange ("imageTitle");
					checkChange ("imageLink");
					checkChange ("imageWidth");
					checkChange ("imageHeight");
					checkChange ("imageDescription");
					}
				feedRec.whenChecked = whenstart;
				feedRec.ctChecks++;
				saveFeed (feedRec);
				if (callback !== undefined) {
					callback (undefined, theFeed, feedRec);
					}
				});
			}
		});
	}
function logNewitem (itemRec) { //5/23/22 by DW
	var now = new Date ();
	var nowstring = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
	nowstring = utils.replaceAll  (nowstring, " ", "");
	var textstring = (itemRec.title === undefined) ? utils.maxStringLength (utils.stripMarkup (itemRec.description), 50) : itemRec.title;
	console.log (nowstring + ": " + textstring);
	}
function checkFeedItems (feedRec, itemsArray, flNewFeed, callback) {
	const feedUrl = feedRec.feedUrl;
	const whenstart = new Date ();
	var ctNewItems = 0;
	
	function checkOneItem (item, callback) {
		const whenstart = new Date ();
		var guid = getItemGuid (item);
		var outlineJsontext = undefined, markdowntext = undefined;
		var enclosureUrl = undefined, enclosureType = undefined, enclosureLength = undefined;
		if (item.enclosure !== undefined) {
			enclosureUrl = item.enclosure.url;
			enclosureType = item.enclosure.type;
			enclosureLength = item.enclosure.length;
			}
		if (item.outline !== undefined) {
			outlineJsontext = utils.jsonStringify (item.outline);
			}
		if (item.markdowntext !== undefined) { //8/25/22 by DW
			markdowntext = item.markdowntext;
			}
		var itemRec = {
			feedUrl,
			guid,
			title: item.title,
			link: item.link,
			description: getItemDescription (item),
			pubDate: getItemPubdate (item.pubDate), //8/26/22 by DW
			enclosureUrl, 
			enclosureType, 
			enclosureLength, 
			id: undefined, //will be defined when saving
			whenCreated: whenstart,
			whenUpdated: whenstart,
			flDeleted: false,
			outlineJsontext,
			markdowntext //8/25/22 by DW
			};
		isItemInDatabase (feedUrl, guid, function (flThere, dbItem) {
			var flChanged = !flThere;
			if (flThere) {
				function checkChange (name, flDateType=false) {
					if (flDateType) {
						function convert (d) {
							return (new Date (d).toUTCString ());
							}
						if (convert (itemRec [name]) != convert (dbItem [name])) {
							flChanged = true;
							}
						}
					else {
						if (itemRec [name] != dbItem [name]) {
							flChanged = true;
							}
						}
					}
				checkChange ("title");
				checkChange ("link");
				checkChange ("description");
				checkChange ("pubDate", true);
				checkChange ("enclosureUrl");
				checkChange ("enclosureLength");
				checkChange ("flDeleted"); //4/22/22 by DW
				itemRec.id = dbItem.id; //must preserve this value
				itemRec.whenCreated = dbItem.whenCreated; //must preserve this value
				}
			if (flChanged) {
				saveItem (itemRec, function (err) {
					if (!flThere) {
						logNewitem (itemRec);
						ctNewItems++;  //7/9/22 by DW
						}
					if (!flNewFeed) { //5/17/22 by DW & 7/13/22 by DW
						const verb = ((flThere) ? "updated" : "new") + "Item";
						var jstruct = {
							item: convertDatabaseItem (itemRec),
							theFeed: convertDatabaseFeed (feedRec)
							}
						updateSocketSubscribers (verb, jstruct);
						}
					callback ();
					});
				}
			else {
				callback ();
				}
			});
		}
	function checkNextItem (ix) {
		if (ix >= itemsArray.length) { //we're done checking
			if (ctNewItems > 0) {
				feedRec.whenUpdated = whenstart;  //7/10/22 by DW
				updateSocketSubscribers ("updatedFeed", convertDatabaseFeed (feedRec));
				clearCachedRivers (feedUrl); //8/22/22 by DW
				saveFeed (feedRec, function () {  //7/10/22 by DW
					callback (undefined);
					});
				}
			else {
				callback (undefined);
				}
			}
		else {
			checkOneItem (itemsArray [ix], function () {
				checkNextItem (ix + 1);
				});
			}
		}
	checkNextItem (0);
	}
function checkFeedAndItems (feedUrl, callback, flNewFeed=false) {
	const whenstart = new Date ();
	checkFeed (feedUrl, function (err, theFeed, feedRec) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			checkFeedItems (feedRec, theFeed.items, false, function (err) { //5/27/22 by DW
				if (callback !== undefined) {
					callback (undefined, theFeed, feedRec); 
					}
				});
			}
		});
	}
function checkOneFeed (feedUrl, callback) {
	checkFeedAndItems (feedUrl, function (err, theFeed, feedRec) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			if (callback !== undefined) {
				callback (undefined, convertDatabaseFeed (feedRec));
				}
			}
		});
	}
function subsCountFixer () { //8/29/22 by DW
	const sqltext = "select * from feeds where ctSubs = 0 order by whenChecked asc limit 1;"; 
	davesql.runSqltext (sqltext, function (err, result) {
		if (!err) {
			if (result.length > 0) {
				var feedRec = result [0];
				countSubsForFeed (feedRec.feedUrl, function (err, ctSubs) {
					if (ctSubs > 0) {
						feedRec.whenChecked = new Date ();
						feedRec.ctChecks++;
						feedRec.ctSubs = ctSubs;
						console.log ("subsCountFixer: feedRec.feedUrl == " + feedRec.feedUrl + ", feedRec.ctSubs == " + feedRec.ctSubs);
						saveFeed (feedRec);
						}
					});
				}
			}
		});
	}
function findLeastRecentlyCheckedFeed (callback) { 
	var sqltext;
	const randomFactor = 10; //9/1/22 by DW
	if (config.flCheckZeroSubsFeeds) {
		if (utils.random (0, 6) == 3) { //9/2/22 by DW
			sqltext = "select * from feeds order by rand () limit 1;"
			}
		else {
			sqltext = "select * from feeds order by whenChecked asc limit " + randomFactor + ";"; 
			}
		}
	else {
		sqltext = "select * from feeds where ctSubs > 0 order by whenChecked asc limit  " + randomFactor + ";"; 
		}
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			if (result.length > 0) {
				var ix = utils.random (0, result.length - 1);
				callback (undefined, result [ix]);
				}
			}
		});
	}
function updateNextFeedIfReady () { 
	if (config.flUpdateFeedsInBackground) {
		var whenstart = new Date ();
		findLeastRecentlyCheckedFeed (function (err, feedRec) {
			if (!err) {
				if (utils.secondsSince (feedRec.whenChecked) > config.minSecsBetwIndividualFeedCheck) {
					feedRec.whenChecked = new Date (); //8/31/22 by DW
					saveFeed (feedRec);
					checkOneFeed (feedRec.feedUrl, function () {
						setFeedCounts (feedRec.feedUrl); 
						});
					}
				}
			});
		}
	}
function getFeed (feedUrl, callback) {
	getDatabaseFeed (feedUrl, function (err, feedRec) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			callback (undefined, convertDatabaseFeed (feedRec));
			}
		});
	}
function getFeedItems (feedUrl, ctItems, callback) { //8/31/22 by DW
	ctItems = (ctItems === undefined) ? config.maxRiverItems : ctItems;
	const sqltext = "select * from items where flDeleted=false and feedurl=" + davesql.encode (feedUrl) + " order by pubDate desc limit " + ctItems + ";"; 
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			callback (undefined, convertItemList (result));
			}
		});
	}

function addToRiverCache (cachekey, feedUrlList, theRiver) { //9/15/22 by DW
	if (flUseRiverCache) { 
		riverCache [cachekey] = {
			feedUrlList, 
			river: theRiver,
			when: new Date ()
			};
		}
	}
function clearCachedRivers (feedUrl) { //8/22/22 by DW
	for (var cachekey in riverCache) {
		var feedUrlList = riverCache [cachekey].feedUrlList;
		if (feedUrlList === undefined) { //the "everything" river -- 10/14/22 by DW
			delete riverCache [cachekey];
			}
		else {
			for (var i = 0; i < feedUrlList.length; i++) {
				if (feedUrlList [i] == feedUrl) {
					delete riverCache [cachekey];
					break;
					}
				}
			}
		}
	}
function clearOldCachedRivers () { //9/15/22 by DW
	for (var cachekey in riverCache) {
		if (utils.secondsSince (riverCache [cachekey].when) > ctSecsLifeRiverCache) {
			console.log ("clearOldCachedRivers: deleting cache for the river whose key is " + cachekey);
			delete riverCache [cachekey];
			}
		}
	}

function startBuildLog () { //10/10/22 by DW
	if (config.flRiverBuildLogEnabled) {
		var f = config.riverBuildLogFolder + utils.getDatePath (undefined, false) + ".json";
		fs.readFile (f, function (err, jsontext) {
			if (!err) {
				try {
					riverBuildLog = JSON.parse (jsontext);
					}
				catch (err) {
					}
				}
			});
		}
	}
function addToRiverBuildLog (whenstart, sqltext) {
	if (config.flRiverBuildLogEnabled) {
		riverBuildLog.unshift ({
			when: whenstart.toLocaleTimeString (), 
			ctSecs: utils.secondsSince (whenstart),
			sqltext
			});
		flRiverBuildLogChanged = true;
		}
	}
function getCurrentRiverBuildLog (callback) {
	callback (undefined, utils.jsonStringify (riverBuildLog));
	}
function saveCurrentBuildLog () {
	if (config.flRiverBuildLogEnabled) {
		var f = config.riverBuildLogFolder + utils.getDatePath (undefined, false) + ".json";
		utils.sureFilePath (f, function () {
			fs.writeFile (f, utils.jsonStringify (riverBuildLog), function (err) {
				});
			});
		}
	}

function getRiver (feedUrl, screenname, callback) {
	const whenstart = new Date ();
	function getFeedClause () {
		var feedClause;
		if (feedUrl === undefined) {
			if (screenname === undefined) { //10/14/22 by DW
				feedClause = "";
				}
			else {
				feedClause = "feedurl in (select feedUrl from subscriptions where listName='" + screenname + "')";
				}
			}
		else {
			if (Array.isArray (feedUrl)) { //it's a list of feed urls -- 8/3/22 by DW
				var listtext = "";
				feedUrl.forEach (function (url) {
					listtext += davesql.encode (url) + ",";
					});
				if (listtext.length > 0) {
					listtext = utils.stringMid (listtext, 1, listtext.length - 1);
					}
				feedClause = "feedurl in (" + listtext + ")";
				}
			else {
				feedClause = "feedurl=" + davesql.encode (feedUrl);
				}
			}
		
		if (feedClause.length > 0) { //10/14/22 by DW
			feedClause = " and " + feedClause;
			}
		
		return (feedClause);
		}
	function sortRiver (theFlatArray) {
		var titles = new Object (), ctDuplicatesSkipped = 0;
		var theRiver = {
			feeds: new Array ()
			};
		var lastFeedUrl = undefined, itemsForThisFeed;
		theFlatArray.forEach (function (item) {
			var flskip = false;
			if (config.flSkipDuplicateTitles) {
				function checkForNull (value) {
					if (value == null) {
						value = "";
						}
					return (value);
					}
				var reducedtitle = utils.trimWhitespace (utils.stringLower (checkForNull (item.title)));
				if (reducedtitle.length > 0) {
					if (titles [reducedtitle] !== undefined) { //duplicate
						ctDuplicatesSkipped++;
						titles [reducedtitle]++;
						flskip = true;
						}
					else {
						titles [reducedtitle] = 1;
						}
					}
				}
			if (!flskip) {
				if (item.feedUrl !== lastFeedUrl) {
					itemsForThisFeed = {
						feedUrl: item.feedUrl,
						whenReceived: item.whenReceived, //8/26/22 by DW
						items: new Array ()
						};
					theRiver.feeds.push (itemsForThisFeed);
					lastFeedUrl = item.feedUrl;
					}
				itemsForThisFeed.items.push (item);
				}
			});
		
		
		return (theRiver);
		}
	const sqltext = "select * from items where flDeleted=false " + getFeedClause () + " order by pubDate desc limit " + config.maxRiverItems + ";"; 
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			addToRiverBuildLog (whenstart, sqltext);
			if (callback !== undefined) {
				let jstruct = sortRiver (convertItemList (result));
				let jsontext = utils.jsonStringify (jstruct);
				callback (undefined, jsontext);
				}
			}
		});
	}
function getRiverFromList (jsontext, callback) {
	var feedUrlList;
	try {
		feedUrlList = JSON.parse (jsontext);
		}
	catch (err) {
		callback (err);
		}
	getRiver (feedUrlList, undefined, callback);
	}
function getRiverFromOpml (urlOpml, callback) { //8/21/22 by DW
	const whenstart = new Date ();
	if (riverCache [urlOpml] !== undefined) { //serve from cache
		console.log ("getRiverFromOpml (serving from cache): urlOpml == " + urlOpml + ", " + utils.secondsSince (whenstart) + " secs.");
		callback (undefined, riverCache [urlOpml].river);
		}
	else {
		getOutlineFromOpml (urlOpml, function (err, theOutline) {
			if (err) {
				callback (err);
				}
			else {
				var feedUrlList = new Array ();
				opml.visitAll (theOutline, function (node) {
					if (notComment (node)) {
						if (node.type == "rss") {
							if (node.xmlUrl !== undefined) {
								feedUrlList.push (node.xmlUrl);
								}
							}
						}
					return (true); //keep visiting
					});
				getRiver (feedUrlList, undefined, function (err, river) {
					if (!err) {
						addToRiverCache (urlOpml, feedUrlList, river); //9/15/22 by DW
						}
					console.log ("getRiverFromOpml: urlOpml == " + urlOpml + ", " + utils.secondsSince (whenstart) + " secs.");
					callback (err, river);
					});
				}
			});
		}
	}
function getRiverFromCategory (screenname, catname, callback) {
	const cachekey = "category:" + screenname + "/" + catname, whenstart = new Date ();
	function getTheFeeds (screenname, catname, callback) {
		const sqltext =  "select * from subscriptions where listname=" + davesql.encode (screenname) + " and categories like '%," + catname + ",%';";
		davesql.runSqltext (sqltext, function (err, result) {
			if (err) {
				callback (err);
				}
			else {
				callback (undefined, result);
				}
			});
		}
	if (riverCache [cachekey] !== undefined) { //serve from cache
		console.log ("getRiverFromCategory (serving from cache): cachekey == " + cachekey);
		callback (undefined, riverCache [cachekey].river);
		}
	else {
		getTheFeeds (screenname, catname, function (err, theSubscriptions) {
			if (err) {
				callback (err);
				}
			else {
				var feedUrlList = new Array ();
				theSubscriptions.forEach (function (sub) {
					feedUrlList.push (sub.feedUrl);
					});
				if (feedUrlList.length == 0) {
					let message = "Can't get the river because there are no feeds in the \"" + catname + "\" category";
					callback ({message});
					}
				else {
					getRiver (feedUrlList, undefined, function (err, river) {
						if (!err) {
							addToRiverCache (cachekey, feedUrlList, river); //9/15/22 by DW
							}
						console.log ("getRiverFromCategory: cachekey == " + cachekey + ", " + utils.secondsSince (whenstart) + " secs.");
						callback (err, river);
						});
					}
				}
			});
		}
	}
function getRiverFromEverything (callback) { //10/14/22 by DW
	const cachekey = "everything";
	if (riverCache [cachekey] !== undefined) { //serve from cache
		callback (undefined, riverCache [cachekey].river);
		}
	else {
		getRiver (undefined, undefined, function (err, river) {
			if (!err) {
				addToRiverCache (cachekey, undefined, river); 
				}
			callback (err, river);
			});
		}
	}
function getRiverFromHotlist (callback) { //10/15/22 by DW
	const cachekey = "hotlist";
	if (riverCache [cachekey] !== undefined) { //serve from cache
		callback (undefined, riverCache [cachekey].river);
		}
	else {
		getHotlist (function (err, theHotlist) {
			if (err) {
				callback (err);
				}
			else {
				var feedUrlList = new Array ();
				theHotlist.forEach (function (item) {
					feedUrlList.push (item.feedUrl);
					});
				if (feedUrlList.length == 0) {
					let message = "Can't get the river because there are no feeds in the hotlist.";
					callback ({message});
					}
				else {
					getRiver (feedUrlList, undefined, function (err, river) {
						if (!err) {
							addToRiverCache (cachekey, feedUrlList, river); 
							}
						callback (err, river);
						});
					}
				}
			});
		}
	}
function getRiverFromUserFeeds (callback) { //12/3/22 by DW
	const cachekey = "userfeeds";
	function notBlockedUser (feedUrl) { //12/9/22 by DW
		var flblocked = false;
		config.blockedUsers.forEach (function (screenname) {
			if (utils.endsWith (feedUrl, screenname)) {
				flblocked = true;
				}
			});
		return (!flblocked);
		}
	if (riverCache [cachekey] !== undefined) { //serve from cache
		callback (undefined, riverCache [cachekey].river);
		}
	else {
		const sqltext = "select feedUrl from feeds where feedurl like 'http://data.feedland.org/feeds/%'";
		davesql.runSqltext (sqltext, function (err, result) {
			if (err) {
				callback (err);
				}
			else {
				var feedUrlList = new Array ();
				result.forEach (function (item) {
					if (notBlockedUser (item.feedUrl)) { //12/9/22 by DW
						feedUrlList.push (item.feedUrl);
						}
					});
				if (feedUrlList.length == 0) {
					let message = "Can't get the river because there are no users with feeds in the database."; //not likely! ;-)
					callback ({message});
					}
				else {
					getRiver (feedUrlList, undefined, function (err, river) {
						if (!err) {
							addToRiverCache (cachekey, feedUrlList, river); 
							}
						callback (err, river);
						});
					}
				}
			});
		}
	}

function getFollowers (feedUrl, callback) { //users who follow the feed -- 5/18/22 by DW
	const sqltext = "select listName from subscriptions where feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			var userarray = new Array ();
			if (result !== undefined) { //4/17/18 by DW
				result.forEach (function (item) {
					userarray.push (item.listName);
					});
				}
			callback (undefined, userarray);
			}
		});
	}
function isUserSubscribed (feedUrl, screenname, callback) { //5/18/22 by DW
	var sqltext = "select * from subscriptions where listName=" + davesql.encode (screenname) + " and feedUrl=" + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (false);
			}
		else {
			const jstruct = {
				flSubscribed: false
				}
			if (result.length > 0) {
				jstruct.flSubscribed = true;
				jstruct.theSubscription = convertCategories (result [0]);
				}
			callback (undefined, jstruct);
			}
		});
	}
function addFeedToUserFeedsOpmlFile (screenname, feedRec, callback) {
	if (config.flMaintainFeedsOpml) {
		const relpath = "feeds.opml";
		const nowstring = new Date ().toGMTString ();
		function saveOutline (theOutline) {
			var opmltext = opml.stringify (theOutline);
			config.writeWholeFile (screenname, relpath, opmltext, callback);
			}
		function createOutline () {
			config.getUserOpmlSubscriptions (screenname, undefined, function (err, opmltext) {
				if (err) {
					callback (err);
					}
				else {
					config.writeWholeFile (screenname, relpath, opmltext, callback);
					}
				});
			}
		config.readWholeFile (screenname, relpath, function (err, data) {
			if (err) { //it doesn't exist
				createOutline ();
				}
			else {
				opml.parse (data.filetext, function (err, theOutline) {
					if (err) {
						createOutline ();
						}
					else {
						theOutline.opml.body.subs.unshift ({ //insert as new first item
							text: feedRec.title,
							type: "rss",
							created: nowstring,
							xmlUrl: feedRec.feedUrl,
							htmlUrl: feedRec.link,
							description: feedRec.description
							});
						saveOutline (theOutline);
						}
					});
				}
			});
		}
	else {
		callback (); //7/3/22 by DW
		}
	}
function countNewSubscriptions (screenname, callback) { //7/20/22 by DW
	const sqltext = "select count(*) as theCount from feeds where whoFirstSubscribed = " + davesql.encode (screenname) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			callback (undefined, result [0].theCount);
			}
		});
	}
function subscribeToFeed (screenname, feedUrl, callback) {
	function checkMaxSubs (theCount, callback) { //10/14/22 by DW
		if (theCount < config.maxNewFeedSubscriptions) {
			callback (true, config.maxNewFeedSubscriptions); 
			}
		else {
			let flcalledback = false;
			if (config.maxSubsExceptions !== undefined) {
				if (config.maxSubsExceptions [screenname] !== undefined) {
					let usermax = config.maxSubsExceptions [screenname];
					callback (theCount < usermax, usermax); 
					flcalledback = true;
					}
				}
			if (!flcalledback) {
				callback (false, config.maxNewFeedSubscriptions); 
				}
			}
		}
	isFeedInDatabase (feedUrl, function (flInDatabase, feedRec) {
		if (flInDatabase) {
			isUserSubscribed (feedUrl, screenname, function (err, jstruct) {
				if (err) {
					callback (err);
					}
				else {
					if (jstruct.flSubscribed) {
						callback (undefined, convertDatabaseFeed (feedRec));
						}
					else {
						addSubscription (screenname, feedUrl, function (err, result) {
							if (err) {
								callback (err);
								}
							else {
								addFeedToUserFeedsOpmlFile (screenname, feedRec, function (err) {
									if (err) {
										callback (err);
										}
									else {
										callback (undefined, convertDatabaseFeed (feedRec));
										}
									});
								}
							});
						}
					}
				});
			}
		else {
			countNewSubscriptions (screenname, function (err, theCount) { //7/20/22 by DW
				if (err) {
					callback (err);
					}
				else {
					checkMaxSubs (theCount, function (flAllowNewSub, actualMax) {
						if (flAllowNewSub) {
							reallysimple.readFeed (feedUrl, function (err, theFeed) {
								if (err) {
									let message = "Can't subscribe because there was an error reading the feed."; //9/25/22 by DW
									callback ({message});
									}
								else {
									var feedRec = setupNewFeedRec (feedUrl, theFeed);
									feedRec.ctItems = theFeed.items.length; //7/13/22 by DW
									feedRec.whoFirstSubscribed = screenname; //7/20/22 by DW
									feedRec.ctSubs = 1; //8/31/22 by DW
									saveFeed (feedRec, function () {
										addSubscription (screenname, feedUrl, function (err, result) {
											if (err) {
												callback (err);
												}
											else {
												addFeedToUserFeedsOpmlFile (screenname, feedRec, function (err) {
													if (err) {
														callback (err);
														}
													else { //8/19/22 by DW -- return before we check in all the new feed items
														let whenstart = new Date ();
														checkFeedItems (feedRec, theFeed.items, true, function () {
															console.log ("subscribeToFeed: checkFeedItems returned after " + utils.secondsSince (whenstart) + " seconds");
															});
														console.log ("subscribeToFeed: returning before all the feed items are checked. " + whenstart.toLocaleTimeString ());
														callback (undefined, convertDatabaseFeed (feedRec));
														}
													});
												}
											});
										});
									}
								});
							}
						else {
							const message = "Can't add the new subscription because you've already created " + actualMax + " new subs.";
							callback ({message});
							}
						});
					}
				});
			}
		});
	}
function getRecentSubscriptions (callback) { //7/23/22 by DW
	const sqltext = "select s.listName, s.feedUrl, f.title, f.description, s.whenUpdated from subscriptions as s, feeds as f where s.feedUrl = f.feedUrl and f.whoFirstSubscribed = s.listName order by s.whenUpdated desc limit " + config.maxRecentSubscriptions + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			var log = new Array ();
			result.forEach (function (item) {
				log.push ({
					subscriber: item.listName,
					title: item.title,
					description: item.description,
					feedUrl: item.feedUrl,
					when: item.whenUpdated
					});
				});
			callback (undefined, log);
			}
		});
	}
function setCategoriesForSubscription (screenname, feedUrl, jsontext, callback) {
	function normalizeCatString (jsontext) { //set up so we can query with LIKE verb -- 1/3/21 by DW
		var apiarray = JSON.parse (jsontext), newcatstring = "";
		apiarray.forEach (function (item) {
			if (item != null) { //9/6/22 by DW
				newcatstring += "," + utils.stringLower (utils.trimWhitespace (item));
				}
			});
		if (newcatstring.length == 0) {
			return (undefined);
			}
		else {
			return (newcatstring + ",");
			}
		}
	const sqltext = "select * from subscriptions where listName = " + davesql.encode (screenname) + " and feedurl = " + davesql.encode (feedUrl) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			var theSubscription = result [0];
			if (theSubscription === undefined) {
				callback ({message: "Can't set the categories because the user isn't subscribed to the feed."});
				}
			else {
				theSubscription.categories = normalizeCatString (jsontext);
				theSubscription.whenUpdated = new Date ();
				const sqltext = "replace into subscriptions " + davesql.encodeValues (theSubscription);
				davesql.runSqltext (sqltext, function (err, result) {
					callback (undefined, theSubscription);
					});
				}
			}
		});
	}

function getStandardFeedElements () { //12/26/22 by DW
	return ("s.feedUrl, f.title, f.htmlUrl, f.ctSubs, f.ctItems, f.whenCreated, f.whenUpdated, f.whenChecked, f.ctChecks, f.ctSecs, f.ctErrors, f.ctConsecutiveErrors, f.whenLastError, f.whoFirstSubscribed, count(s.feedUrl) as ct, f.whenUpdated")
	}
function getUsersOpmlUrl (screenname) {
	return ("xxx");
	}
function getFeedsInCategory (screenname, catname, callback) {
	var likeclause = (catname === undefined) ? "" : " and categories like '%," + catname + ",%'"; //11/5/22 by DW
	
	var sqltext = "select s.feedUrl, f.title, f.description, f.htmlUrl, f.ctSubs, f.ctItems, f.whenCreated, f.whenUpdated, f.whenChecked, f.ctChecks, f.ctSecs, f.ctErrors, f.ctConsecutiveErrors, f.whenLastError, s.categories, f.whoFirstSubscribed from subscriptions as s, feeds as f where s.feedUrl = f.feedUrl and f.title is not null and s.listName = " + davesql.encode (screenname) + likeclause + " order by s.whenUpdated desc;";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			if (false) { // (result.length == 0) { //9/9/22 PM by DW
				let message = "There are no feeds in the \"" + catname + "\" category.";
				callback ({message});
				}
			else {
				var returnedArray = new Array (); //9/5/22 by DW
				removeNullValues (result); 
				result.forEach (function (sub) {
					returnedArray.push (convertCategories (sub));
					});
				callback (undefined, returnedArray);
				}
			}
		});
	}
function getSubscriptions (screenname, callback) {
	getFeedsInCategory (screenname, undefined, callback);
	}
function getOpmlFromArray (metadata, feedsArray) {
	var opmltext = "", indentlevel = 0, now = new Date ();
	function add (s) {
		opmltext += utils.filledString ("\t", indentlevel) + s + "\n";
		}
	function encode (s) {
		if ((s === undefined) || (s === null)) {
			return ("");
			}
		return (utils.encodeXml (s));
		}
	add ("<?xml version=\"1.0\"?>");
	add ("<opml version=\"2.0\">"); indentlevel++;
	//add head
		add ("<head>"); indentlevel++;
		
		if (metadata.dateCreated !== undefined) {
			metadata.dateCreated = new Date (metadata.dateCreated).toUTCString ();
			}
		for (var x in metadata) {
			if (x !== "name") {
				var s = metadata [x];
				if (s !== undefined) { //12/21/20 AM by DW -- the app actually got this error, go figure
					if (s.length > 0) {
						add ("<" + x + ">" + encode (s) + "</" + x + ">");
						}
					}
				}
			}
		
		add ("<dateModified>" + now.toUTCString () + "</dateModified>");
		add ("</head>"); indentlevel--;
	add ("<body>"); indentlevel++;
	//add the <outline> elements
		function att (name, val) {
			if ((val === undefined) || (val === null)) {
				return ("");
				}
			else {
				return (" " + name + "=\"" + utils.encodeXml (val) + "\"");
				}
			}
		function addOneSub (theSub) {
			function getCatsAtt () {
				var catsatt = "", catstring = theSub.categories;
				if (catstring !== undefined) {
					catsatt = utils.stringMid (catstring, 2, catstring.length - 2); //something like ["all","nyt","tech"]
					if (catsatt.length > 0) {
						catsatt = utils.replaceAll (catsatt, "\"", "");
						catsatt = att ("category", catsatt);
						}
					}
				return (catsatt);
				}
			add ("<outline type=\"rss\"" + att ("text", theSub.title) + att ("xmlUrl", theSub.feedUrl) + att ("htmlUrl", theSub.htmlUrl) +  getCatsAtt () + " />");
			}
		function addSubs (subs) {
			if (subs !== undefined) {
				for (var i = 0; i < subs.length; i++) {
					var feed = subs [i];
					if (feed.subs !== undefined) {
						add ("<outline" + att ("text", feed.text) + ">"); indentlevel++;
						addSubs (feed.subs);
						add ("</outline>"); indentlevel--;
						}
					else {
						addOneSub (feed);
						}
					}
				}
			}
		addSubs (feedsArray);
	add ("</body>"); indentlevel--;
	add ("</opml>"); indentlevel--;
	return (opmltext);
	}
function getUserOpmlSubscriptions (screenname, catname, callback) {
	const whenFirstStartup = new Date ("5/23/22; 11:27:12 AM");
	
	function getTheList (callback) {
		if (catname === undefined) {
			getSubscriptions (screenname, callback);
			}
		else {
			getFeedsInCategory (screenname, catname, callback);
			}
		}
	getTheList (function (err, feedsArray) {
		if (err) {
			callback (err);
			}
		else {
			var categoryInfo = (catname === undefined) ? "" : " (category: " + catname + ")";
			var metadata = {
				title: "Subscriptions for " + screenname + categoryInfo,
				description: "List created by " + myProductName + " v" + myVersion
				};
			var opmltext = getOpmlFromArray (metadata, feedsArray);
			callback (undefined, opmltext);
			}
		});
	}
function getHotlist (callback) { //7/26/22 by DW
	const sqltext = "select " + getStandardFeedElements () + " from subscriptions as s, feeds as f where s.feedUrl = f.feedUrl and f.title is not null group by feedUrl order by ct desc limit 100;";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			removeNullValues (result);
			callback (undefined, result);
			}
		});
	}
function getHotlistOpml (callback) { //7/26/22 by DW
	getHotlist (function (err, theHotlistArray) {
		if (err) {
			callback (err);
			}
		else {
			var metadata = {
				title: "FeedLand hotlist in OPML",
				description: "The most popular feeds on FeedLand, as an OPML subscription list.",
				dateCreated: new Date ("7/30/22; 6:02:31 PM")
				};
			var opmltext = getOpmlFromArray (metadata, theHotlistArray);
			callback (undefined, opmltext);
			}
		});
	}
function getFeedSearch (theSearchString, callback) { //12/26/22 by DW
	const pattern = davesql.encode ("%" + theSearchString + "%");
	const sqltext = "select " + getStandardFeedElements () + " from subscriptions as s, feeds as f where s.feedUrl = f.feedUrl and f.title like + " + pattern + " group by feedUrl order by ct desc limit 100;";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			removeNullValues (result);
			callback (undefined, result);
			}
		});
	}

function isUserInDatabase (screenname, callback) { //9/17/22 by DW
	const sqltext = "select * from users where screenname=" + davesql.encode (screenname) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (false);
			}
		else {
			if (result.length == 0) {
				callback (false);
				}
			else {
				callback (true, result [0]);
				}
			}
		});
	}
function setUserPrefs (screenname, jsontext, callback) { //9/15/22 by DW
	function normalizeCatString (s) {
		if (s == ",all,") {
			s = "All";
			}
		return (s);
		}
	var prefs;
	try {
		prefs = JSON.parse (jsontext);
		}
	catch (err) {
		callback (err);
		return;
		}
	const now = new Date ();
	var userRec = {
		screenname: maxStringLength (screenname, config.maxListNameLength),
		
		whenCreated: now,
		whenUpdated: now,
		
		ctStartups: prefs.ctStartups,
		whenLastStartup: new Date (prefs.whenLastStartup),
		
		categories: normalizeCatString (prefs.usersCategoryList),
		homePageCategories: normalizeCatString (prefs.homePageCategoryList),
		
		newsproductCategoryList: normalizeCatString (prefs.newsproductCategoryList), //9/26/22 by DW
		newsproductTitle: prefs.newsproductTitle,
		newsproductDescription: prefs.newsproductDescription,
		newsproductImage: prefs.newsproductImage,
		newsproductStyle: prefs.newsproductStyle,
		newsproductScript: prefs.newsproductScript,
		
		myFeedTitle: prefs.myFeedTitle,  //11/6/22 by DW
		myFeedDescription: prefs.myFeedDescription
		};
	isUserInDatabase (screenname, function (flInDatabase, userRecFromDatabase) {
		if (flInDatabase) {
			if (userRecFromDatabase.whenCreated != null) {
				userRec.whenCreated = userRecFromDatabase.whenCreated
				}
			userRec.emailAddress = userRecFromDatabase.emailAddress; //12/8/22 by DW
			userRec.emailSecret = userRecFromDatabase.emailSecret;
			}
		else { //12/12/22 by DW -- xxx
			if (!config.flEnableNewUsers) {
				const message = "Could not set the user's prefs because new users are not being accepted here at this time.";
				callback ({message});
				return;
				}
			}
		const sqltext = "replace into users " + davesql.encodeValues (userRec);
		davesql.runSqltext (sqltext, function (err, result) {
			if (err) {
				callback (err);
				}
			else {
				if (userRecFromDatabase !== undefined) { //11/15/22 by DW
					if ((userRecFromDatabase.myFeedTitle != prefs.myFeedTitle) || (userRecFromDatabase.myFeedDescription != prefs.myFeedDescription)) { //11/6/22 by DW
						config.buildUsersFeed (screenname); 
						}
					}
				callback (undefined, userRec);
				}
			});
		});
	}
function getAllUsers (callback) { //9/15/22 by DW
	const sqltext = "select users.screenname, users.ctStartups, users.whenLastStartup, users.whenCreated, users.whenUpdated, users.categories, users.homePageCategories, users.newsproductCategoryList, users.newsproductTitle, users.newsproductDescription, users.newsproductImage, users.newsproductStyle, count(*) as ctSubs from users inner join subscriptions on subscriptions.listname = users.screenname group by users.screenname;"
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			callback (err);
			}
		else {
			removeNullValues (result); //10/6/22 by DW
			callback (undefined, result); 
			}
		});
	}
function getUserCategories (screenname, callback) { //9/19/22 by DW
	isUserInDatabase (screenname, function (flInDatabase, userRec) {
		if (flInDatabase) {
			const catsRec = {
				screenname,
				categories: userRec.categories,
				homePageCategories: userRec.homePageCategories
				};
			callback (undefined, catsRec);
			}
		else {
			callback ({message: "Can't get the categories because there is no user named \"" + screenname + "\"."});
			}
		});
	}
function getUserPrefs (screenname, callback) { //9/26/22 by DW
	isUserInDatabase (screenname, function (flInDatabase, userRec) {
		if (flInDatabase) {
			if (userRec.emailSecret !== undefined) { //12/16/22 by DW
				delete userRec.emailSecret;
				}
			callback (undefined, removeNullValuesFromObject (userRec));
			}
		else {
			callback ({message: "Can't get the user prefs because there is no user named \"" + screenname + "\"."});
			}
		});
	}

function addToLikesTable (screenname, itemId, callback) { //10/16/22 by DW
	const likesRec = {
		listName: screenname,
		itemId,
		emotion: 1, //the default, just plain like
		whenCreated: new Date ()
		};
	const sqltext = "replace into likes " + davesql.encodeValues (likesRec);
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			if (callback !== undefined) {
				callback (undefined, likesRec);
				}
			buildLikesFeed (screenname); //9/17/22 by DW
			}
		});
	}
function removeFromLikesTable (screenname, itemId, callback) { //10/16/22 by DW
	const sqltext = "delete from likes where listName=" + davesql.encode (screenname) + " and itemId=" + davesql.encode (itemId) + ";";
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			if (callback !== undefined) {
				const likesRec = new Object (); //return an empty object
				callback (undefined, likesRec);
				}
			}
		});
	}
function convertLikesToArray (likesString) { //10/15/22 by DW
	var likesArray = new Array ();
	if ((likesString !== undefined) && (likesString !== null) && (likesString.length > 0)) { 
		var splits = likesString.split (",");
		splits.forEach (function (name) {
			if (name.length > 0) {
				likesArray.push (name);
				}
			});
		}
	return (likesArray);
	}
function convertLikesarrayToString (likesArray) {
	var likesString = "";
	likesArray.forEach (function (name) {
		likesString += "," + name;
		});
	if (likesString.length > 0) {
		likesString += ",";
		}
	return (likesString);
	}
function isLiked (screenname, itemId, callback) {
	getItemFromDatabase (itemId, function (err, itemRec) {
		if (err) {
			callback (err);
			}
		else {
			let likesArray = convertLikesToArray (itemRec.likes), flLiked = false;
			likesArray.forEach (function (name) {
				if (name == screenname) {
					flLiked = true;
					}
				});
			callback (undefined, flLiked, itemRec);
			}
		});
	}
function toggleItemLike (screenname, itemId, callback) {
	function updateLikesTable (flLiked) {
		if (flLiked) {
			removeFromLikesTable (screenname, itemId);
			}
		else {
			addToLikesTable (screenname, itemId);
			}
		}
	isLiked (screenname, itemId, function (err, flLiked, itemRec) {
		if (err) {
			callback (err);
			}
		else {
			let likesArray = convertLikesToArray (itemRec.likes), likesString = "";
			if (flLiked) { //remove from array
				likesArray.forEach (function (name) {
					if (name != screenname) {
						likesString += "," + name;
						}
					});
				if (likesString.length > 0) {
					likesString += ",";
					}
				}
			else { //add to array
				likesArray.push (screenname);
				likesString = convertLikesarrayToString (likesArray);
				}
			itemRec.likes = likesString;
			itemRec.ctLikes = likesArray.length;
			saveItem (itemRec, function (err, data) {
				if (err) {
					if (callback !== undefined) {
						callback (err);
						}
					}
				else {
					var convertedRec = convertDatabaseItem (itemRec);
					var jstruct = {
						item: convertedRec,
						theFeed: undefined
						}
					updateSocketSubscribers ("updatedItem", jstruct);
					updateLikesTable (flLiked);
					if (callback !== undefined) {
						callback (undefined, convertedRec);
						}
					}
				});
			}
		});
	}
function getLikes (itemId, callback) {
	getItemFromDatabase (itemId, function (err, itemRec) {
		if (err) {
			callback (err);
			}
		else {
			let likesArray = convertLikesToArray (itemRec.likes), returnedArray = new Array ();
			likesArray.forEach (function (name) {
				returnedArray.push ({
					who: name
					});
				});
			callback (undefined, returnedArray);
			}
		});
	}

function buildLikesFeed (screenname, callback) { //10/19/22 by DW
	function buildOne (flForAll, callback) {
		const whenstart = new Date ();
		const whereClause = (flForAll) ? "" : " where likes.listName=" + davesql.encode (screenname) + " ";
		const sqltext = "select likes.listName, likes.itemId, likes.whenCreated, items.title, items.link, items.description, items.pubDate, items.guid, items.enclosureUrl, items.enclosureType, items.enclosureLength from likes inner join items on likes.itemId = items.id " + whereClause + " order by likes.whenCreated desc limit " + config.maxRssItems + ";"
		davesql.runSqltext (sqltext, function (err, likedRecs) {
			if (err) {
				callback (err);
				}
			else {
				let title = (flForAll) ? "FeedLand likes for all users" : "FeedLand likes for " + screenname;
				let description = (flForAll) ? "Recent liked items from the people of FeedLand" : "Recent FeedLand likes for " + screenname;
				let headElements = {
					title,
					link: "http://feedland.org/?likes",
					description,
					language: "en-us",
					generator: myProductName + " v" + myVersion,
					flRssCloudEnabled: true, 
					rssCloudDomain: "rpc.rsscloud.io",
					rssCloudPort: 5337,
					rssCloudPath: "/pleaseNotify",
					rssCloudRegisterProcedure: "",
					rssCloudProtocol: "http-post",
					maxFeedItems: 25
					};
				let historyArray = new Array ();
				likedRecs.forEach (function (likedRec) {
					var rssItem = {
						title: checkNull (likedRec.title),
						link: checkNull (likedRec.link),
						text: checkNull (likedRec.description),
						when: checkNull (likedRec.whenCreated),
						twitterScreenName: checkNull (likedRec.listName),
						guid: {
							flPermalink: false,
							value: likedRec.itemId
							}
						};
					if (notNull (likedRec.enclosureUrl) && notNull (likedRec.enclosureType)) {
						if (!utils.beginsWith (likedRec.enclosureType.toLowerCase (), "image")) {
							rssItem.enclosure = {
								url: checkNull (likedRec.enclosureUrl),
								type: checkNull (likedRec.enclosureType),
								length: checkNull (likedRec.enclosureLength)
								}
							}
						}
					historyArray.push (rssItem);
					});
				let xmltext = rss.buildRssFeed (headElements, historyArray); 
				let s3path = config.s3LikesPath + ((flForAll) ? "all.xml" : screenname + ".xml");
				let urlFeed = "http:/" + s3path;
				s3.newObject (s3path, xmltext, "text/xml", "public-read", function (err, data) {
					if (err) {
						console.log ("buildLikesFeed: err.message == " + err.message);
						callback (err);
						}
					else {
						console.log ("buildLikesFeed: " + utils.secondsSince (whenstart) + " secs.");
						checkOneFeed (urlFeed, function () { //10/17/22 by DW
							rss.cloudPing (undefined, urlFeed);
							});
						callback (undefined, urlFeed);
						}
					});
				}
			});
		}
	buildOne (true, function (err, data) {
		buildOne (false, function (err, data) {
			if (callback !== undefined) {
				callback (err, data);
				}
			});
		});
	}

function pleaseNotify (urlServer, port, path, urlFeed, domain, callback) { //rssCloud support
	var now = new Date ();
	const theRequest = {
		url: urlServer,
		method: "POST",
		followAllRedirects: true, 
		maxRedirects: 5,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
		body: buildParamList ({
			domain, //12/12/22 by DW
			port,
			path,
			url1: urlFeed,
			protocol: "http-post"
			})
		};
	console.log ("pleaseNotify: theRequest == " + utils.jsonStringify (theRequest)); //12/10/22 by DW
	requestWithRedirect (theRequest, function (err, response, body) {
		if (err) {
			callback (err);
			}
		else {
			callback (undefined, body);
			}
		});
	}
function renewNextSubscriptionIfReady (options) { //rssCloud support
	if (options.enabled && options.flRequestNotify) {
		if (options.port !== undefined) { //http is enabled
			var sqltext = "select * from feeds where urlCloudServer != '' order by whenLastCloudRenew asc limit 1;"; //10/29/19 by DW
			davesql.runSqltext (sqltext, function (err, result) {
				if (err) {
					console.log ("renewNextSubscriptionIfReady: err.message == " + err.message);
					}
				else {
					if (result.length > 0) { 
						var feedRec = result [0];
						if (utils.secondsSince (feedRec.whenLastCloudRenew) > options.ctSecsBetwRenews) { //ready to be renewed
							pleaseNotify (feedRec.urlCloudServer, options.port, options.feedUpdatedCallback, feedRec.feedUrl, options.domain, function (err, data) {
								if (err) {
									console.log ("renewNextSubscriptionIfReady: err.message == " + err.message + ", feedRec.urlCloudServer == " + feedRec.urlCloudServer + ", feedRec.feedUrl == " + feedRec.feedUrl);
									}
								else {
									console.log ("renewNextSubscriptionIfReady: feedRec.feedUrl == " + feedRec.feedUrl);
									}
								feedRec.whenLastCloudRenew = new Date ();
								feedRec.ctCloudRenews++;
								saveFeed (feedRec);
								});
							}
						}
					}
				});
			}
		}
	}
function renewFeedNow (feedUrl, options, callback) { //rssCloud support
	isFeedInDatabase (feedUrl, function (flInDatabase, feedRec) {
		if (flInDatabase) {
			pleaseNotify (feedRec.urlCloudServer, options.port, options.feedUpdatedCallback, feedRec.feedUrl, options.domain, function (err, data) {
				if (err) {
					console.log ("renewFeedNow: err.message == " + err.message + ", feedRec.urlCloudServer == " + feedRec.urlCloudServer + ", feedRec.feedUrl == " + feedRec.feedUrl);
					}
				else {
					console.log ("renewFeedNow: feedRec.feedUrl == " + feedRec.feedUrl);
					}
				feedRec.whenLastCloudRenew = new Date ();
				feedRec.ctCloudRenews++;
				saveFeed (feedRec);
				callback (err, data);
				});
			}
		else {
			let message = "Can't renew the feed because it's not in the database.";
			callback ({message});
			}
		});
	}

function backupDatabase () { //8/22/22 by DW
	function uploadToGithub (path, data, type, callback) {
		const options = {
			flUseQueue: true, //10/1/22 by DW
			username: config.githubBackup.username,
			repo: config.githubBackup.repo,
			password: config.githubBackup.password,
			repoPath: config.githubBackup.basepath + path,
			data: data,
			type,
			committer: config.githubBackup.committer,
			message: config.githubBackup.message,
			userAgent: myProductName + " v" + myVersion
			};
		davegithub.uploadFile (options, function (err, response, body) {
			console.log ("uploadToGithub: path == " + options.username + "/" + options.repo + "/" + options.repoPath + ", status == " + response.statusCode);
			if (callback !== undefined) {
				callback ();
				}
			});
		}
	function backupToFile (fname, result) {
		var f = config.backupFolder + fname;
		utils.sureFilePath (f, function () {
			var jsontext = utils.jsonStringify (result);
			fs.writeFile (f, jsontext, function (err) {
				if (err) {
					console.log ("backupToFile: f == " + f + ", err.message == " + err.message);
					}
				else {
					console.log ("backupToFile: f == " + f + ", size == " + utils.gigabyteString (jsontext.length));
					}
				});
			if (config.githubBackup.enabled) {
				uploadToGithub (fname, jsontext, "application/json"); //9/30/22 by DW
				}
			});
		}
	function backupQuery (sqltext, fname) {
		davesql.runSqltext (sqltext, function (err, result) {
			if (err) {
				console.log ("backupQuery: fname == " + fname + ", err.message == " + err.message);
				}
			else {
				result.forEach (function (item) {
					for (var x in item) {
						if (item [x] == null) {
							item [x] = undefined;
							}
						}
					});
				backupToFile (fname, result);
				}
			});
		}
	backupQuery ("select * from feeds;", "feeds.json");
	backupQuery ("select * from subscriptions;", "subscriptions.json");
	backupQuery ("select * from likes;", "likes.json");
	backupQuery ("select * from users;", "users.json"); //9/30/22 by DW
	
	var when = utils.dateYesterday (new Date ());
	var year = when.getFullYear ();
	var month = utils.padWithZeros (when.getMonth () + 1, 2);
	var day = utils.padWithZeros (when.getDate (), 2);
	var datestring = year + "-" + month + "-" + day;
	backupQuery ("select * from items where date (whenCreated) = '" + datestring + "';", "items/" + year + "/" + month + "/" + day + ".json")
	getHotlist (function (err, theHotlistArray) { //9/23/22 by DW
		if (err) {
			console.log ("backupDatabase: error backing up hotlist == " + err.message);
			}
		else {
			let f = "hotlist/" + year + "/" + month + "/" + day + ".json";
			backupToFile (f, theHotlistArray);
			}
		});
	}

function start (options, callback) {
	function everySecond () {
		if (flRiverBuildLogChanged) { //10/10/22 by DW
			saveCurrentBuildLog ();
			flRiverBuildLogChanged = false;
			}
		}
	function everyMinute () {
		clearOldCachedRivers (); 
		}
	
	initStats ();
	startBuildLog (); //10/10/22 AM by DW
	if (options !== undefined) {
		for (var x in options) {
			config [x] = options [x];
			}
		}
	if (callback !== undefined) {
		callback (undefined);
		}
	
	setInterval (everySecond, 1000); //10/10/22 by DW
	utils.runEveryMinute (everyMinute); //9/15/22 by DW
	}