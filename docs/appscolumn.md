# What is the apps column in users table for?

The apps column is a JSON object that we use to store info about the apps we connect with, or any other data an app wants to keep around on a per-user basis.

### Example

Textcaster is an app I did last spring that turns FeedLand into a linkblog. I use it for the <a href="http://scripting.com/?tab=links">linkblog</a> on Scripting News. 

This is an example of the apps object for each user of Textcaster.

```JSON"apps": {	"bluesky": {		"enabled": true,		"siteurl": "https://bsky.social/",		"password": "xxx",		"mailaddress": "dave.winer@gmail.com"		},	"mastodon": {		"scopes": "write:statuses+read:accounts",		"appname": "feedToMasto",		"enabled": true,		"siteurl": "https://social.masto.land/",		"accesstoken": "xxx"		},	"metadata": {		"whenStarted": "2023-09-22T12:19:59.035Z"		},	"marktwain": {		"leadingQuestion": "You're looking well today!",		"editorPlaceholderText": "Something interesting goes here."		},	"wordpress": {		"enabled": true,		"siteurl": "https://linkblog3.wordpress.com",		"password": "xxx",		"username": "scripting"		}	}```

