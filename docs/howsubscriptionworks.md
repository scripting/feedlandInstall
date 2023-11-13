# How subscription works in FeedLand

For each feed in the database, it keeps track of who first subscribed to the feed.

When a user subscribes to a feed, first we check to see if it's in the database, if it is, we go ahead and subscribe the user.

If the feed is not in the database, we run a query to see how many feeds the user is the first subscriber of. If that number is lower than the limit,Êconfig.maxNewFeedSubscriptions, we go ahead and subscribe.

If the feed is not in the database, and the user is at the limit, we do not subscribe to the feed and return an error. The user sees a dialog that says they have exceeded the limit.

All the code for this, other than the UI, is in <a href="https://github.com/scripting/feedland/blob/main/database/database.js#L1730">feedlanddatabase</a>.

