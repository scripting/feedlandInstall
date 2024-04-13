# February 2024 transition

We added a bunch of stuff to the database tables that FeedLand uses. 

Here we document the steps, in case you're operating a pre-Feb2024 FeedLand install. 

Hopefully this will be the last time we do such a chaotic transition. 

The steps

1. Created a new feedland database setup using the original <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/setup.sql">setup.sql</a>.

2. Ran the current version of feedland. 

3. Fixed all the SQL errors because the new columns weren't defined. This required running four bits of code at the command line.

```SQLALTER TABLE items ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;ALTER TABLE feeds ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;ALTER TABLE subscriptions ADD COLUMN feedId INT UNSIGNED NOT NULL DEFAULT 0;CREATE INDEX feedId ON items (feedId);```

4. At that point feedland.js ran reasonably well. There was still one problem, all the feeds had feedId of 0. The feeds table needed to be rearranged a bit. 

5. I ran this bit of code.

```SQLALTER TABLE feeds ADD COLUMN feedId INT AUTO_INCREMENT PRIMARY KEY,ADD UNIQUE KEY (feedUrl);```

6. It worked. Now new feeds are getting feedId values that increment with each new feed. 

7. I then made the changes I made manually to the old version of setup.sql, and that's the new version. 

8. I deleted setup2.sql.

9. We now know that the code and spec for the database are in agreement, and hopefully they will never fall out of sync again. This was some bad practice over here. Mea culpa. 

10. To be sure we're on solid ground I created a new server following with the new setup and it's still running smoothly in mid-April 2024. 

