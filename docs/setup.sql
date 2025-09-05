create database feedland character set utf8mb4 collate utf8mb4_unicode_ci;

use feedland;

create table feeds (
	feedId int auto_increment primary key,
	feedUrl varchar (512) unique,
	title text, 
	htmlUrl text, 
	description text, 
	whenCreated datetime,
	whenUpdated datetime, 
	whoFirstSubscribed text,
	ctItems int default 0,
	ctSubs int default 0,
	ctSecs float,
	ctErrors int default 0, 
	ctConsecutiveErrors int default 0, 
	errorString text, 
	whenChecked datetime, 
	ctChecks int default 0, 
	whenLastError datetime, 
	urlCloudServer text, 
	whenLastCloudRenew datetime, 
	ctCloudRenews int default 0, 
	copyright text,
	generator text,
	language text,
	twitterAccount text,
	managingEditor text,
	webMaster text,
	pubDate datetime,
	lastBuildDate datetime,
	docs text,
	ttl int,
	imageUrl text,
	imageTitle text,
	imageLink text,
	imageWidth int default 0,
	imageHeight int default 0,
	imageDescription text
	);

create table items (
	feedUrl varchar (512), 
	feedId int unsigned not null default 0,
	guid varchar (255), 
	title text, 
	link text, 
	description longtext,  
	pubDate datetime, 
	enclosureUrl text, 
	enclosureType text, 
	enclosureLength int default 0, 
	id int auto_increment key, 
	whenCreated datetime, 
	whenUpdated datetime, 
	flDeleted boolean, 
	markdowntext longtext,
	outlineJsontext text, 
	ctLikes int default 0,
	likes text,
	metadata json not null default (json_object()),
	index feedId (feedId)
	);

create table subscriptions (
	listName varchar (64), 
	feedUrl varchar (256), 
	feedId int unsigned not null default 0,
	categories varchar (512), 
	whenUpdated datetime, 
	urlReadingList varchar (256) not null default '',
	primary key (feedUrl, listName, urlReadingList)
	);

create table users (
	screenname  varchar (255), 
	
	ctStartups  int default 0,
	whenLastStartup datetime,
	
	whenCreated datetime, 
	whenUpdated datetime, 
	
	categories text, 
	homePageCategories text, 
	newsproductCategoryList text,
	
	newsproductTitle text,
	newsproductDescription text,
	newsproductImage text,
	newsproductStyle text,
	newsproductScript text,
	
	myFeedTitle text,
	myFeedDescription text,
	
	emailAddress text,
	emailSecret text,
	
	apps json,
	
	role varchar (32),
	
	primary key (screenname)
	);

create table likes (
	listName varchar (255), 
	itemId int,
	emotion int,
	whenCreated datetime, 
	primary key (listName, itemId)
	);

create table pendingConfirmations (
	magicString varchar (25),
	email text,
	flDeleted boolean, 
	screenname text,
	flNewUser boolean,
	urlRedirect text,
	whenCreated datetime,
	primary key (magicString)
	);

create table staticfiles (
	screenname  varchar (255), 
	relpath varchar (255), 
	type varchar (64),
	filecontents text,
	flprivate boolean,
	whenCreated datetime, 
	whenUpdated datetime, 
	ctSaves int default 0,
	primary key (screenname, relpath, flprivate)
	);

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

create index itemFeed on items(feedUrl);
create index itemPubDate on items(pubDate);
create index subscriptionsListname on subscriptions(listname);
create index itemDeleted on items(flDeleted);
create index subscriptionsFeedUrl on subscriptions(feedUrl);
create index feedItemIndex on items(flDeleted, pubDate, feedUrl);
create index itemGuidUrl on items(guid, feedUrl);
