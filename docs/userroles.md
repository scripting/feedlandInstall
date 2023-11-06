# New <i>roles</i> column in the <i>user</i> table

Defaults to <i>user</i> can be set to <i>admin</i> for people supporting other users on a FeedLand instance. 

### How to upgrade

Create a new column in the <i>users</i> table:

`alter table users add column role varchar(32) default 'user';`

There is no user interface at this time for setting the value of a user's role, but you can do it at the command line:

`update users set role = 'admin' where screenname = 'betsyguernsey';`

### Context

This feature is used to implement Supervisor Mode, where an admin user can see the product from the point of view of another server, to help diagnose a support issue. 

It's patterened after a similar feature in WordPress.

Docs for using Supervisor Mode will appear elsewhere. 

