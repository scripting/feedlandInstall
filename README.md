# FeedLand server install

Instructions for setting up a FeedLand server.

### Private testing and bug fixing

We have started testing the install process for FeedLand server as of January 24, 2023. 

If you have access to this site, you can try installing from the <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.md">instructions</a>. Report any problems as <a href="https://github.com/scripting/feedlandInstall/issues">issues</a> in this repo. 

And here's the <a href="http://roadmap.feedland.org/">roadmap</a> for this release. 

### About FeedLand

I've been running a FeedLand server myself since October 2022. 

It was always the plan to let other people run their own FeedLand instances, but first I wanted to be sure the server ran reasonably smoothly, and the UI was stable. 

I think at the beginning of 2023 we've gotten there. 

Hence this package.

### How to install

When you follow <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.md">the setup instructions</a> you will have a FeedLand instance running on your server.

You can use it yourself, or share it with others. Or use both models at the same time. 

If you're just using it yourself it does not have to be accessible over the net. 

### Where's the source code?

The server software is layered as a stack of Node packages that build on each other. These are the packages Dave Winer wrote and maintains. The top level stuff is GPL2-licensed, the lower level packages are MIT-licensed. 

* <a href="https://github.com/scripting/feedland">feedland</a> -- the top level, the HTTP and websockets interface that connects to the browser-based client.

* <a href="https://github.com/scripting/feedland/tree/main/database">feedlanddatabase</a> -- the code that manages the tables for users, feeds, items, subscriptions, likes. 

* <a href="https://github.com/scripting/opml">opml</a> -- reading and writing OPML files for subscription lists. 

* <a href="https://github.com/scripting/reallysimple">reallysimple</a> -- reading RSS, Atom, RDF feeds. 

* <a href="https://github.com/scripting/rss">daverss</a> -- publishing RSS feeds.

* <a href="https://github.com/scripting/appServer">daveappserver</a> -- handles the file system, mid-level web server, email, identity.

* <a href="https://github.com/scripting/twitter">davetwitter</a> -- interfacing with the Twitter API, identity.

* <a href="https://github.com/scripting/github">davegithub</a> -- writing to GitHub repos, for backups. 

* <a href="https://github.com/scripting/http">davehttp</a> -- low-level HTTP functionality.

* <a href="https://github.com/scripting/sql">davesql</a> -- interfaces to MySQL, queuing. 

* <a href="https://github.com/scripting/mail">davemail</a> -- sending email.

* <a href="https://github.com/scripting/s3">daves3</a> -- reading and writing to and from Amazon S3.

### No pull requests, please

I can't accept pull requests because I edit the code in an outliner, that's <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/sourceopml.md">what source.opml is all about</a>. 

So the best thing to do when you spot a mistake is flag it as an issue in the repo, point to the code in question if that's helpful, and I'll thank you and make the fix myself.

And if you want to add a feature and have it included in this distribution, post an issue and let's talk about it. ;-)

### Questions, support

If your questions are about server installation and setup, post a note in <a href="https://github.com/scripting/feedlandInstall/issues">issues section</a> of this repo. 

If you need help with using FeedLand to manage and share feeds, post a note in the <a href="https://github.com/scripting/feedlandSupport/issues">FeedLandSupport</a> issues section.

No matter where you post it, please look to see if your question has been covered in other threads, and please be <a href="http://guidelines.scripting.com/">respectful</a>. 

