# How to set up a FeedLand instance

A checklist to set up a new instance. 

### Requirements

A server with Node.js installed.

Access to MySQL either on the local machine or as a service running elsewhere.

Amazon SES to send email for authentication.

Amazon S3 for optional features.

### Download the folder

<a href="https://github.com/scripting/feedlandInstall/archive/refs/heads/main.zip">Download the folder</a> from this repo, and copy the files into the folder you want to serve from. 

Note: the only files you actually need for the install are:

1. package.json

2. feedland.js

3. emailtemplate.html

4. config.json

### Install the packages

Launch the terminal app on this system, <i>cd</i> into the directory containing the files and type:

`npm install`

It downloads the packages needed to run FeedLand into the node_modules sub-folder.

### MySQL setup

Decide if you want to run your own copy of MySQL or use a service to manage it for you.

I use Digital Ocean's MySQL service and have been very happy with the cost, performance and reliability of the service.

You will need to get the following information to add to the database section of config.json.

* host: The domain name of the machine running MySQL.

* port: The port it's running on.

* user: The name of the user associated with the database. 

* password: The user's password.

* database: The name of the database that will hold FeedLand's info.

### S3 setup (optional)

Some features depend on using Amazon S3 to store feeds for users and likes. 

If you want to use those features, set up a place for FeedLand to store the files. 

It can be a separate bucket, or a folder within an existing bucket. 

The location must be accessible via HTTP.

### Create your database

Open a terminal window to connect to the MySQL database. 

The commands to create the database are in <a href="https://github.com/scripting/feedlandInstall/blob/main/setup.sql">setup.sql</a>. Select the text from that file and paste it into the terminal window. 

### Set up an Amazon SES account

We use SES to send mail. At some point we will probably expand the options here.

I'm not exactly sure how to do it. I did it myself once a few years ago, and it's worked without a hitch since then. 

If someone wants to write docs on how to do this, I'd be happy to link them in here. 

You will need to have a credentials.txt to provide access info to the Amazon software. 

### Fill in the info in config.json

I've included a template for config.json, with the pieces you need to fill in to get your FeedLand instance running. 

Open that file in a text editor, in the folder you're running FeedLand. It should be obvious how the data from this page maps onto the entries in config.json, but here are some notes about special cases.

* If you're running the server locally, say on port 1452, you would set myDomain to "localhost:1452".

* You should set flWebsocketEnabled true if you want users to get realtime updates. 

* There is a set of steps for using Twitter identity, but we haven't documented them at this time. So unless you know what you're doing re Twitter identity, leave this false. 

* urlForFeeds, s3PathForFeeds, s3LikesPath and urlNewsProducts are for optional features, if you don't want to host feeds for users, or make Likes subscribable, set them to the empty string.

### Run the app

Type this at the command line:

`node feedland.js`

To try it out, enter the value for myDomain in config.json into a web browser. That should bring up the FeedLand client, ready for you to sign up or sign in.

### Edit emailtemplate.html

Any time you want to change what's in the emails FeedLand sends on your behalf, just edit the text of this file.

### Optionally, install newsProductServer app

See the instructions in the <a href="https://github.com/scripting/newsProductServer">newsProductServer</a> repo.

