# September 2025 transition

We add a new metadata column to the <i>items</i> table.

### At the MySQL command line

```sql

alter table items add column metadata json not null default (json_object());

```

### In the directory you run FeedLand from 

`npm update`

### Notes

* Version numbers: feedland: v0.7.0, feedlanddatabase: v0.8.2, wpidentity: v0.5.25.

* The SQL command may take a long time to run, depending on the size of your <i>items</i> table.

* If you're installing a fresh FeedLand just follow the usual instructions, it automatically creates an items table with a metadata column. (This should be tested too.)

### Background

<p>The reason this is a more difficult update is that we're adding a column to the `items` table, `metadata`, which is a JSON object. 

<p>It will allow us to add new data to the database without having to go through this again. The rule is, we only put data here that passes through the feedlanddatabase level, data it doesn't need to do its stuff.

<p>I'm doing this now because I want to keep two bits of information for every item -- `wpSiteId` and `wpPostId`. 

<p>These values are present for posts that emanate from a WordPress site. They are present in feeds from those sites. We also support this data in the feeds WordLand generates. 

<p>This data was necessary so the highest levels of the new version WordLand can know if a post coming in through FeedLand came from one of the user's sites. This means we can put an <i>Edit This Page</i> button when we display the item in a twitter-like timeline. 

