# How to setup SES

I asked <a href="https://chat.openai.com">chat.openai.com</a> to write this for me. :-)

### How to

* Setting up Amazon SES (Simple Email Service) involves several steps, including creating an AWS account, obtaining SMTP credentials, and configuring your email sending domains and email addresses. Here is a general overview of the process:

* Create an AWS account: If you don't already have an AWS account, you'll need to create one in order to use Amazon SES. Go to <a href="https://aws.amazon.com/">aws.amazon.com</a> and click on "Create a new AWS account."

* Obtain SMTP credentials: Once you have an AWS account, you'll need to obtain SMTP credentials to use for sending email through Amazon SES. Go to the AWS Management Console, select the "Identity and Access Management (IAM)" service, and create a new IAM user with the "Programmatic access" type of access.

* Create a new SES email sending domain: In the Amazon SES console, click on "Verified Email Addresses" and then "Verify a New Email Address" to verify the email address that you will be sending email from.

* Create an SNS topic and subscribe your email address: In the Amazon SNS console, create a new topic, and subscribe your email address to it.

* Configure your DNS: To configure your DNS, you will need to add a few MX, SPF and DKIM records to your domain's DNS settings.

* Test sending an email: Once you have completed the above steps, you can test sending an email from your email address to another email address.

* Please note that some of the specifics of these steps may vary depending on your specific use case and the email sending domain you are using. It's recommended to follow Amazon SES documentation for more detailed instructions.

### SES sender address configuration (written by ChatGPT)

* Choose a sender address

   Use an email address at a domain you own (e.g. `no-reply@yourdomain.com`).  

   Do not use `gmail.com` or other third-party addresses as the sender.

* Verify the sender

* If sending from a single address:  

   - Go to SES / Verified identities / "Create identity" / Email address / Enter and verify your address.

* If sending from multiple addresses at a domain (recommended):  

   - Go to SES / Verified identities / "Create identity" / Domain / Enter your domain name.  

   - Enable Easy DKIM (2048-bit recommended).  

   - If hosted in Route 53, SES can automatically add the DNS records.  

   - Otherwise, manually add the three CNAME records SES provides to your DNS configuration.

* Check SPF record

- In your domain's DNS, ensure there is a TXT record authorizing SES to send mail: `v=spf1 include:amazonses.com ~all`

* Wait for verification  

- SES will automatically detect the DNS changes and mark your domain as verified.

* After completing these steps

- You can send mail using any address at your verified domain (e.g. `no-reply@yourdomain.com`) and mail will pass SPF and DKIM checks for improved deliverability.

Note from Dave, 7/11/25

I've been setting up a new FeedLand server. Using email for login. This is where I hit a wall. 

I was using dave.winer@gmail.com as the return address. You can't use gmail.com. 

You have to use a domain you control, and then have to set it up with some special CNAMEs that tell Amazon that you authorized using those domains for this purpose. It basically links your domain to your SES account. 

I added a link to the docs in setup page, so hopefully next time, I will not have to spend most of a day chasing down this problem! 

Now I have to get the websockets working on the new FeedLand install. 

