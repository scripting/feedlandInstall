#### 2/25/24; 9:30:54 AM by DW

TL;DR -- <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a> has been updated so it now creates a database that's compatible with the current version of the server software. If you need to convert an existing installation to the new software, you'll have to do what I did in the steps below, or you could export subscription lists and start over with a fresh database. 

I punted on setup2.sql, instead approached it as an upgrade -- which I did step by step, as noted below.

1. Created a new feedland database setup using the original <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a>.

2. Ran the current version of feedland. 

3. Fixed all the SQL errors because the new columns weren't defined. This required running four bits of code at the command line.

```SQLALTER TABLE items ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;ALTER TABLE feeds ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;ALTER TABLE subscriptions ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;CREATE INDEX feedId ON items (feedId);```

4. At that point feedland.js ran reasonably well. There was still one problem, all the feeds had feedId of 0. The feeds table needed to be rearranged a bit. 

5. I ran this bit of code.

```SQLALTER TABLE feeds ADD COLUMN feedId INT AUTO_INCREMENT PRIMARY KEY,ADD UNIQUE KEY (feedUrl);```

6. It worked. Now new feeds are getting feedId values that increment with each new feed. 

7. I then made the changes I made manually to the old version of setup.sql, and that's the new version. 

8. I deleted setup2.sql.

9. We now know that the code and spec for the database are in agreement, and hopefully they will never fall out of sync again. This was some bad practice over here. Mea culpa. 

#### 2/22/24; 1:40:39 PM by DW

Created a <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setups.sql">new version</a> of setup.sql that includes the indexes in the table creation code. 

I will test it by creating a new instance before archiving the old version and replacing it with the new one. 

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

