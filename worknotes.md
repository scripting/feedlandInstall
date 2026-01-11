#### 1/11/26; 9:49:21 AM by DW

New index added to the setup instructions and posted as a recommendation for previous FeedLand installs. 

* `create index itemCreated on items (whenCreated);`

#### 10/26/25; 12:21:45 PM by DW

New version of database software, reading news should be faster on systems with large <i>items</i> tables.

The upgrade is <a href="https://github.com/scripting/feedlandInstall/issues/69">explained here</a>. Note that you have to create a new index. 

#### 9/5/25; 9:44:10 AM by DW

See this <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/sep2025transition.md">special docs page</a> for details on the new version of FeedLand, v0.8.0.

#### 8/10/25; 9:12:39 AM by DW

Changed the default of <a href="https://github.com/scripting/feedlandInstall/blob/main/config.json#L35">config.database.flUseMySql2</a> to true. Gave it some thought, listened to <a href="https://github.com/scripting/feedlandInstall/issues/67#issuecomment-3169306552">Chuck's opinion</a>, decided it was worth stepping into the future. It's been running with this package on feedland.com for over a year. 

#### 8/7/25; 1:43:02 PM by DW

Fixed a mistake in yesterday's update about where flUseMySql2 is. It's part of the database object in config.json. 

I added it to the <a href="https://github.com/scripting/feedlandInstall/blob/main/config.json#L35">starter config.json template</a>, with the value of false, which has been the default all along, thus is the safest choice.

Removed the note I added yesterday in the config.json docs, and included what it said here:

* If config.database.flUseMySql2 is true, FeedLand will use the <a href="https://www.npmjs.com/package/mysql2">mysql2</a> package. 

There was a <a href="https://github.com/scripting/feedlandInstall/issues/67">discussion</a> of this in the Issues section, and it would be a good place to post a question or comment. 

#### 8/6/25; 11:00:32 AM by DW

Added <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#flusemysql2">docs</a> for config.flUseMySql2.

#### 7/11/25; 10:54:07 AM by DW

Added a <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setupses.md#ses-sender-address-configuration-added-july-11-2025-by-dw-written-by-chatgpt">new section</a> to the SES docs explaining how to set up sender address configuration. 

#### 5/31/25; 6:23:17 PM by DW

New config <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#legaltags">setting</a>, legalTags, configures what HTML you allow to pass from a feed into the database. The default is to let through &lt;p> and &lt;br>.

#### 5/27/24; 12:18:38 PM by DW

New config settings, `membershipClosedHeadline` and `membershipClosedExplanation` can customize the default messages in the signon dialog in FeedLand. 

They default to the previously hard-coded messages. 

#### 2/25/24; 9:30:54 AM by DW

TL;DR -- <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a> has been updated so it now creates a database that's compatible with the current version of the server software. If you need to convert an existing installation to the new software, you'll have to do what I did in the steps below, or you could export subscription lists and start over with a fresh database. 

See this <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/feb2024transition.md">special docs page</a> for a step-by-step account of how to upgrade an existing installation.

#### 11/14/23; 9:24:15 AM by DW

Added an index <a href="https://github.com/scripting/feedlandInstall/issues/41#issuecomment-1791143618">recommended</a> by Scott Hanson. 

`create index itemGuidUrl on items(guid, feedUrl);`

It took about four minutes to run on feeland.org. 

Also added it to the <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql#L163">SQL code</a> used to initialize a fresh FeedLand. 

#### 11/13/23; 11:42:10 AM by DW

Making WordPress <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/wordpresslogin.md#making-wordpress-identity-the-default">the default identity service</a>.

#### 11/8/23; 3:43:27 PM by DW

New versions of feedland, feedlanddatabase, <a href="https://github.com/scripting/reallysimple/tree/main/demos/feedhunter">feedhunter</a>, 0.6.16, 0.7.10, 0.4.1, respectively.

#### 11/5/23; 5:01:57 PM by DW

Supervisor Mode implemented. 

New versions of feedland, feedlanddatabase, daveappserver, versions 0.6.15, 0.7.9, 0.7.10.

New column in the user table -- <i>role</i> whose default value is "user", one other recognized value "admin".

Notes for the update are at <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/userroles.md">userroles.md</a>. 

#### 11/2/23; 9:39:07 AM by DW

Provided an example for how the <i>apps</i> object works in <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/appscolumn.md">appscolumn.md</a>. 

#### 11/1/23; 11:05:17 AM by DW

WordPress login. 

I posted a quick howto at <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/wordpresslogin.md">wordpresslogin.md</a>. 

If you want to turn it off, set config.flAllowWordpressIdentity false

#### 10/17/23; 9:51:53 AM by DW

Added new index in <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a>. 

`create index feedItemIndex on items(flDeleted, pubDate, feedUrl);`

#### 10/14/23; 11:12:38 AM by DW -- v0.6.0

<a href="https://github.com/scripting/feedlandInstall/blob/main/docs/readinglistupgrade.md">Instructions</a> to upgrade a FeedLand installation to support reading lists.

Modified <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a> to include support for reading lists.

#### 10/3/23; 3:57:17 PM by DW

Added two index creation commands to the end of <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a>. These had been added manually to feedland.org, but not documented here. They improve performance for rivers of lots of feeds like my <i>All</i> category.

#### 9/21/23; 9:33:02 AM by DW

Documented new <i>staticfiles in sql</i> feature. 

1. <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#flstaticfilesinsql">config.flStaticFilesInSql</a>

2. <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql#L121">SQL code</a> to create the new staticfiles table. 

3. <a href="https://github.com/scripting/feedlandInstall/issues/39">Instructions</a> for getting started, with a place to ask questions. 

Removed setup instruction for News Product server config. The feature is built into FeedLand now, no need to install a separate app.

#### 9/19/23; 11:30:14 AM by DW

Documented flRenewSubscriptions. It's been there since 10/29/22. There are times you want it off, esp when running behind a firewall, you're asking to renew but you won't pass the test. It accomplishes nothing in that case but wasting resources. 

#### 9/13/23; 10:21:36 AM by DW

Two new config values, flUseRiverCache, ctSecsLifeRiverCache.

Added to the <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#fluserivercache-ctsecsliferivercache">config.md page</a> and <a href="https://github.com/scripting/feedlandInstall/blob/main/config.json#L61">config.json example</a>. 

#### 8/16/23; 5:15:49 AM by DW

Previous versions saved pending confirmations in memory and on disk in stats.json. This worked fine where there is one instance of feedland.js, but now we're scaling up so there can be many instances, all working on the same data. This means we have to have the option to store pending confirmations in the database so all instances can work off the same data. 

If you're running a single-instance FeedLand , the defaults are set so that it continues to operate as before. If you want to update to use the database as storage for pending confirmations, this is what you have to do.

1. In config.json, add a new setting, flUseDatabaseForConfirmations set to true.

<code>flUseDatabaseForConfirmations: true,</code>

2. In your database, create a new table called pendingConfirmations.

```SQLcreate table pendingConfirmations (	magicString varchar (25),	email text,	flDeleted boolean, 	screenname text,	flNewUser boolean,	urlRedirect text,	whenCreated datetime,	primary key (magicString)	);```

3. cd into the directory containing feedland.js and npm install.

Of course you need to reboot FeedLand to reflect the new setup. 

I have also updated the docs to reflect this new feature.

Previously confirmations expired after one hour by default. I changed the default to 24 hours. There were complaints that they expired too quickly. It's hard for me to understand what causes the delay, but let's give them a bit more grace. You can of course change this setting.

<code>confirmationExpiresAfter: 60 * 60 * 24,</code>

To test, sign off and sign back on. Create a new account. Please report any problems <a href="https://github.com/scripting/feedlandInstall/issues/37">in this thread</a>. 

#### 5/26/23 by DW

New version, gets the updated prefs system in the database. 

No feature in FeedLand that's waiting for this feature, I added it for another project I'm working on, one which makes it possible to build apps on FeedLand as a platform. 

When you want to install the new version:

1. <i>npm update</i> the feedland.js app.

2. In MySQL, run this command: <i>alter table users add apps json;</i>

3. Relaunch feedland.js. 

#### 4/24/23 by DW

Site is publicly announced in this <a href="http://scripting.com/2023/04/24/151114.html">Scripting News post</a>. 

#### 3/29/23; 9:44:01 AM by DW

Add flNightlyBackup to the <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md">config.md</a> docs page. 

#### 3/20/23; 12:20:36 PM by DW

Added urlFeedlandApp to both example config.json files.

#### 1/30/23; 1:09:27 PM by DW

Documented new config.json value urlServerForClient.

#### 1/29/23; 11:08:31 AM by DW

It's now possible to read the source.opml file for this repo by clicking a <a href="http://gitsourcereader.opml.org/?repo=feedlandInstall">link</a>.

It doesn't work for this site right now because it's still private and the gitSourceReader app needs to read the source.opml file over HTTP.

#### 1/25/23; 10:09:58 AM by DW

<a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#urlstarterfeeds">Documented</a> <i>urlStarterFeeds</i> value in config.json.

Wrote a <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/signup.md">doc</a> explaining how to sign up on your own instance. 

#### 1/24/23; 11:42:08 AM by DW

We now support SMTP email in addition to SES.

Did a quick review of this site, and will post a note in the Issues section explaining how we start. 

Adding more collaborators to this now-private repo.

Started this Worknotes file. 

