# Tips

Random advice for getting started with your own FeedLand installation.

### How to restart your server

If you launched it at the command line, press Control-C on Unix or Cmd-C on a Mac. 

Then, switch into the directory with feedland.js, and launch it with 

`node feedland.js`

### How to update when a new version of FeedLand comes out

Change into the directory containing feedland.js.

`npm update`

Quit and restart the server.

### Manually setting up a user

You can create a new user by entering a MySQL command at the command line. 

`insert into users (screenname, emailAddress, emailSecret) values ('bullmancuso', 'bullmancuso@gmail.com', 'getoutahere');`

On the user's machine, go to the home page of your server, open the JavaScript console and enter.

`localStorage.emailMemory = "{'emailaddress': 'bullmancuso@gmail.com', 'code': 'getoutahere', 'screenname': "bullmancuso'}";`

Then go to the feed list for the user.

`http://yourserver.com/?username=bullmancuso`

