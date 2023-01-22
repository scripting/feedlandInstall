# Tips

Random advice for getting started with your own FeedLand installation.

### How to update when a new version of FeedLand comes out

Change into the directory containing feedland.js.

`npm update`

Quit and restart the server.

### Manually setting up a user

You can create a new user by entering a MySQL command at the command line. 

`insert into users (screenname, emailAddress, emailSecret) values ('bullmancuso', 'bullmancuso@gmail.com', 'gorrilla');`

On the user's machine, go to the home page of your server, open the JavaScript console and enter.

`localStorage.emailMemory = "{'emailaddress': 'bullmancuso@gmail.com', 'code': 'xxx', 'screenname': "bullmancuso'}";`

Then go to the feed list for the user.

`http://yourserver.com/?username=bullmancuso`

