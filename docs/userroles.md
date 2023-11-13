# New <i>roles</i> column in the <i>user</i> table

There's a new column in the users table called roles. 

It defaults to user. If you change it to admin for a user, they will be able to "supervise" any other user on a FeedLand instance, for support and debugging. 

### How to upgrade

Create a new column in the <i>users</i> table:

`alter table users add column role varchar(32) default 'user';`

There is no user interface at this time for setting the value of a user's role, but you can do it at the command line:

`update users set role = 'admin' where screenname = 'betsyguernsey';`

### Context

This feature is used to implement Supervisor Mode, where an admin user can see the product from the point of view of another user, to help diagnose a support issue. 

It's patterned after a similar feature in WordPress.

Docs for using Supervisor Mode will appear elsewhere. 

