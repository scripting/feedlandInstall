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

### mailSender, confirmEmailSubject, confirmationExpiresAfter

These values determine how confirmatioin emails are sent.

mailSender is the email address of the sender of the emails. 

confirmEmailSubject is the subject for confirmation emails.

confirmationExpiresAfter is the number of seconds after which email confirmations expire. 3600, the default, is one hour. 

### urlNewsProducts

The URL of the <a href="https://github.com/scripting/feedlandInstall/tree/main/newsProductServer">news products server</a> you're using. 

