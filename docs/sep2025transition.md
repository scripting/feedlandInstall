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

