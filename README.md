# FeedLand server install

Instructions for setting up a FeedLand server on Ubuntu.

### About FeedLand

I've been running a FeedLand server myself since October 2022. 

It was always the plan to let other people run their own FeedLand instances, but first I wanted to be sure the server ran reasonably smoothly, and the UI was stable. 

I think at the beginning of 2023 we've gotten there. 

Hence this package.

### What is this?

When you follow these instructions you will have a FeedLand instance running on your server.

You can use it yourself, or share it with others. Or use both models at the same time. 

If you're just using it yourself it does not have to be accessible over the net. 

### Requirements

1. You need a server that can run Node.js and has a command line where you can do simple operations. I'll provide instructions that work on Ubuntu, but they'll probably work on other Unix systems, and can be adapted to run elsewhere. 

2. A current Node.js install.

3. A git client. 

### How to

<i>cd</i> to the directory you want to install FeedLand in. 

git clone https://github.com/scripting/feedlandInstall.git

nano config.json -- see this page for how to edit config.json.

npm install

node feedland.js

