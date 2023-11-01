# WordPress login upgrade

How to set up FeedLand to allow users to login via <a href="https://developer.wordpress.com/docs/wpcc/">WordPress Connect</a>. 

### Create an app on WordPress.com

Create a <a href="https://developer.wordpress.com/apps/">new application</a> on wordpress.com. 

It's up to you what the name, description and website url is for the app. 

The "Redirect URL" is essential and must be right or it won't work.

`https://myfeedland.org/callbackFromWordpress`

That assumes your server is hosted on myfeedland.org.

The 

### Add this to config.json

```JSON

"wordpress": {

"clientId": 12345,

"clientSecret": "1234567890123456789012345678901234567890123456789012345678901234",

"urlRedirect": "https://myfeedland.org/callbackFromWordpress",

"scope": "global"

}

```

Obviously replace the values for clientId and clientSecret with the ones you got from the WordPress app page.

