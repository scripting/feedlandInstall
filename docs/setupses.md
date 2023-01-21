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

