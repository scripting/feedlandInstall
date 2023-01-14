# How to set up a FeedLand instance

A checklist to set up a new instance. 

### Requirements

A server with Node.js installed.

Access to MySQL either on the local machine or as a service running elsewhere.

Amazon SES to send email for authentication.

Amazon S3 for optional features.

### Download the folder

Download the folder from this repo, and copy the files into the folder you want to serve from. 

Launch the terminal app on this system, cd into the directory containing the files and type:

npm install

That downloads the packages we need to run FeedLand into the node_modules sub-folder.

### MySQL setup

Decide if you want to run your own copy of MySQL or use a service to manage it for you.

I use Digital Ocean's MySQL service and have been very happy with the cost, performance and reliability of the service.

You will need to get the following information to add to the database section of config.json.

host: The domain name of the machine running MySQL.

port: The port it's running on.

user: The name of the user associated with the database. 

password: The user's password.

database: The name of the database that will hold FeedLand's info.

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

Open that file in a text editor, in the folder you're running FeedLand. It should be obvious how the data from this page maps onto the entries in config.json.

