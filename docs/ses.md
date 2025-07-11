# Amazon SES sender address configuration

To use Amazon SES for sending mail from FeedLand (or any related app), you must ensure that SES is properly configured for the email address you use as the sender ("from" address). SES requires that this address belongs to a domain you control and that SES is authorized to send mail for that domain.

Note from DW: This was written by ChatGPT after I went through a torturous debugging job of figuring what was needed to get SES to work properly. Turns out I was using my gmail.com address for the send-from for each email, and that's virtually impossible to get working with SES for some reason. These instructions help you set it up so you can use your domain with SES.

### Choose a sender address

   Use an email address at a domain you own (e.g. `no-reply@yourdomain.com`).  

   Do not use `gmail.com` or other third-party addresses as the sender.

### Verify the sender

   If sending from a single address:  

   - Go to SES ’! Verified identities ’! "Create identity" ’! Email address ’! Enter and verify your address.



   If sending from multiple addresses at a domain (recommended):  

   - Go to SES ’! Verified identities ’! "Create identity" ’! Domain ’! Enter your domain name.  

   - Enable Easy DKIM (2048-bit recommended).  

   - If hosted in Route 53, SES can automatically add the DNS records.  

   - Otherwise, manually add the three CNAME records SES provides to your DNS configuration.

### Check SPF record

   In your domain's DNS, ensure there is a TXT record authorizing SES to send mail: `v=spf1 include:amazonses.com ~all`

### Wait for verification**  

   SES will automatically detect the DNS changes and mark your domain as verified.

### After completing these steps

You can send mail using any address at your verified domain (e.g. `no-reply@yourdomain.com`) and mail will pass SPF and DKIM checks for improved deliverability.

