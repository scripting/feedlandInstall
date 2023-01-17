# News Product Server

A <a href="http://docs.feedland.org/newsProducts.opml">news product</a> is a one-page website you create with FeedLand for people outside of FeedLand to read.

This is the News Product server, which is a Node.js application. 

If you want to support news products with your FeedLand installation, you should run this server software, and connect it to a FeedLand server with "urlFeedlandServer" in the config.json file. 

You must also configure FeedLand to connect to this server with "urlNewsProducts" in config.json, so it can provide a link to each users News Product in the first menu.

