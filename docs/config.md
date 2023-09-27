# About config.json

All configuration for FeedLand is done in this file

### General notes

The things you have to set are at the top of the file. As you go down the file, they get more optional.

### myDomain

This is how the server talks about itself. If it's running on a remote machine, use the domain name for the machine. If FeedLand is not running on port 80, include the port. Like this: mydomain.com:1452.

### database

This struct provides all the info FeedLand needs to communicate with your MySQL database. 

### port

The port that FeedLand will run on. 

FeedLand also looks for process.env.PORT, and will use that port instead, if it's provided.

### flWebsocketEnabled

FeedLand can use WebSockets to send messages back to the client app, when new items are found, or are updated. 

It defaults to true.

### websocketPort

Ignored if flWebsocketEnabled is false, otherwise it specifies the port that we run WebSockets on. 

### flEnableNewUsers

If true, new users will be able to create accounts using email as identity. 

It defaults to false. 

Note that from this point in the file all the defaults should only be changed if you want to change the basic behavior of FeedLand. 

### maxRiverItems

When FeedLand generates a "river" structure, this is the maximun number of items it will return. 

Default: 175.

### maxNewFeedSubscriptions

Each user can create this many new feed subscriptions, ie feeds that no one else is subscribed to. 

You can subscribe to as many other feeds as you like. 

Default: 250.

### flUpdateFeedsInBackground

If true, FeedLand will read feeds in the background looking for new items. This is a very basic function, if you turn it off the feed reader won't do very much.

Default: true.

### minSecsBetwFeedChecks

The number of seconds between checking for feed updates in the background. It chooses a different feed every time, based on which feed has least recently been checked. 

Default: 15.

### mailSender, confirmEmailSubject, confirmationExpiresAfter, flUseDatabaseForConfirmations

These values determine how confirmatioin emails are sent.

mailSender is the email address of the sender of the emails. 

confirmEmailSubject is the subject for confirmation emails.

confirmationExpiresAfter is the number of seconds after which email confirmations expire. 86400, the default, is 24 hours. 

flUseDatabaseForConfirmations determines whether we store the pending confirmations in memory or in the database. If you're starting a new installation, you should set this true. It defaults to false, to preserve previous behavior.

### urlNewsProducts

The URL of the <a href="https://github.com/scripting/feedlandInstall/tree/main/newsProductServer">news products server</a> you're using. 

### flNewsProducts

If true, the server supports news products. In the client the menu item for the user's news product is enabled only if flNewsProducts is true. 

The settings are still there for the categories in the news product even if flNewsProducts is false. 

Default: false.

### flUserFeeds 

If true, the server supports user feeds. In the client two menu items are enabled only if flUserFeeds is true. 

* Edit my feed

* Read user feeds

The settings for the user's title and description are enabled even if flUserFeeds is false. 

Default: false.

### flLikesFeeds 

If true, the server supports feeds for likes, both for individual users and for all users of FeedLand on this server. 

Default: false.

### smtpHost, smtpPort, smtpUsername, smtpPassword

Set these values if you want FeedLand to send confirming emails via SMTP instead of Amazon SES (the default). 

### urlStarterFeeds

When a user first signs up with FeedLand, we ask if they want subscribe to a set of starter feeds.

If you want to provide your own starter list for your users, set the <i>urlStarterFeeds</i> value in your config.json with the URL of your OPML subscription list. 

Default: http://scripting.com/publicfolder/feedland/subscriptionLists/starterfeeds.opml

### urlFavicon

You can customize the favicon of your FeedLand installation by setting urlFavicon in config.json to point to the favicon file you want to use. 

Default: http://scripting.com/favicon.ico

### urlServerForClient

If you want to use HTTPS to serve FeedLand you must set this value in config.json. 

The URL should begin with either // or https:// so that the FeedLand client will be able to call back to your server in accordance with the rules for HTTPS.

An example, if your value for myDomain is "hello.com", this his how you would define urlServerForClient.

"urlServerForClient": "https://hello.com/"

Default: http://mydomain.com/

### urlServerForEmail

The URL of the server we'll use in emails. It's required if you're using email identity. 

Default: undefined.

### flUseTwitterIdentity

If you want to use Twitter for identity instead of email, set this true. 

"flUseTwitterIdentity": true

If it's true you also need to specify <i>twitterConsumerKey</i> and <i>twitterConsumerKeySecret</i> in config.json, which you can get from the Twitter developer system. 

Default: false

### flUseS3ForStorage, s3PathForStorage

You can use S3 storage instead of local file system storage, by setting <i>flUseS3ForStorage</i> true in config.json. 

Then <i>s3PathForStorage</i> is the path on S3 that FeedLand should use for storage. As with the file system, there will be publicFiles nad privateFiles sub-directories.

The publicFiles content can be accessed over the web the same way they would if they were stored locally on the FeedLand server machine. 

The default for <i>flUseS3ForStorage</i> is false.

Here are <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/s3storage.md">some tips</a> for setting things up on the Amazon side of this. 

### flNightlyBackup

If true we backup the database at midnight local time to the data sub-folder of the folder containing the FeedLand app. 

The default value for flNightlyBackup is false.

### maxGetAllUsers

The number of users who are returned when database.getAllUsers is called, and for the <a href="https://feedland.org/?userslist">Recent Users</a> command in the feedlandHome app.

The default value for maxGetAllUsers is 100.

### flUseRiverCache, ctSecsLifeRiverCache

FeedLand can cache rivers so that every time one is requested, if nothing has changed in the feeds it contains, it can save doing a database rebuild for that river. 

We also age-out cache elements, so they to rebuild every so often even if none of the feeds they contain have updated. 

The default value of flUseRiverCache is true. 

The default value of ctSecsLifeRiverCache is 300 (five minutes). 

### flRenewSubscriptions

If true, we renew rssCloud subscriptions every 24 hours. 

If you're running behind a firewall, you should turn this off, the subscription renewal will fail. 

The default value is true.

### flStaticFilesInSql

If true, FeedLand will store static files in an SQL table instead of the local filesystem or S3.

This setting overrides the other storage-related config settings such as flUseS3ForStorage and s3PathForStorage or publicFilesPath. In other words even if you have it set up to save to S3, we will save to the local table if flStaticFilesInSql is true. It's set up this way so migration from S3 or local files to the database is automatic, if it can't find a file in the table, it'll try to find it in the other storage location, if so it returns that. 

The default value is false.

### logMinSecs, logMaxResults

<i>New feature, 9/27/23.</i>

FeedLand will log info about SQL queries that take longer than <i>logMinSecs</i> seconds or return more than <i>logMaxResults</i> results. 

Default values are 5 and 1000.

### flUseSqlForSockets, minSecsBetwSqlSocketChecks

<i>New feature, 9/27/23.</i>

If flUseSqlForSockets is true in addition to sending websocket messages when we find a new feed item, either through scanning or receiving and rssCloud ping, we periodically do an SQL query for new elements in the items table. You would set this true if you're running FeedLand in a multiple-instance environment. 

minSecsBetwSqlSocketChecks determines how often FeedLand will do the SQL query if flUseSqlForSockets is true.

Default values are false and 5.

