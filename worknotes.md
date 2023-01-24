### 1/24/23; 11:42:08 AM by DW

#### SMTP support

Since FeedLand uses email to identify users,  it must be able to send confirming emails to users. As of 1/24 you can now configure FeedLand to send emails via SMTP, in addition to the previously supported Amazon SES. 

To configure it for SMTP, provide four new values in config.json, smtpHost, smtpPort, smtpUsername and smtpPassword.

I've included these in the example <a href="https://github.com/scripting/feedlandInstall/blob/main/config.json">config.json</a> file and described them in the config.json docs. 

#### Open for testing

Did a quick review of this site, and will post a note in the Issues section explaining how we start. Adding more collaborators to this now-private repo.

Started this Worknotes file. 

