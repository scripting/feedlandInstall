create database feedland character set utf8mb4 collate utf8mb4_unicode_ci;

use feedland;

create table feeds (
	feedUrl varchar (512), 
	title text, 
	htmlUrl text, 
	description text, 
	whenCreated datetime,  -- when the database record was created
	whenUpdated datetime, 
	whoFirstSubscribed text, -- 7/20/22 by DW
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
	imageDescription text,
	primary key (feedUrl)
	);

create table items (
	feedUrl varchar (512), 
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
	likes text
	);

create table subscriptions (
	listName varchar (255), 
	feedUrl varchar (512), 
	categories varchar (512), 
	whenUpdated datetime, 
	primary key (feedUrl, listname)
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
	
	primary key (screenname)
	);

create table likes (
	listName varchar (255), 
	itemId int,
	emotion int,
	whenCreated datetime, 
	primary key (listName, itemId)
	);

create index itemFeed on items(feedUrl);
create index itemPubDate on items(pubDate);
create index subscriptionsListname on subscriptions(listname);