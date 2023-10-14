# Reading list upgrade

If you have a FeedLand installation prior to v0.6.0, released on October 14, 2023, you'll need to make some changes to the database before installing the new software. 

### Changes to <i>subscriptions</i> table

```SQL

alter table subscriptions modify listName varchar (64);

alter table subscriptions modify feedUrl varchar (256);

alter table subscriptions add urlReadingList varchar (256);

alter table subscriptions drop primary key;

alter table subscriptions add primary key (feedUrl, listName, urlReadingList); 

```

### Notes on <i>subscriptions</i> table changes, above

We had to change the lengths of <i>listName</i> and <i>feedUrl</i> to create space for adding <i>urlReadingList</i> to the primary key. 

This created problems for us, and possibly will for you -- some feedUrl's may not fit in 256 characters. In feedland.org's database, there were only three records, out of tens of thousands, and I solved the problem by deleting the subscriptions. Far from an ideal solution, but the other alternative was to reorganize this table and the code that runs it, and the cost for that was too high. I'm still learning about SQL databases, and I apologize if you hit similar problems in this change, if so -- please post a note in <a href="https://github.com/scripting/feedlandInstall/issues/40#issue-1943334716">this thread</a>.

### Two new tables

```SQL

create table readinglists (

opmlUrl varchar (256), 

title text,

description text,

id int auto_increment, 

whenCreated datetime,

whenChecked datetime,

ctChecks int default 0,

whoFirstSubscribed text,

feedUrls json,

primary key (opmlUrl),

unique (id)

);

create table readinglistsubscriptions (

opmlUrl varchar (256), 

screenname  varchar (64), 

whenCreated datetime, 

primary key (opmlUrl, screenname)

);

```

### Problems, questions, suggestions, kudos

I started a <a href="https://github.com/scripting/feedlandInstall/issues/40#issue-1943334716">thread</a> in the Issues section here. 

