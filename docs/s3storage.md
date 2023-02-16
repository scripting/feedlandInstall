# Using S3 storage

You can tell FeedLand to store data files on Amazon S3 instead of the local file system. This is necessary in some hosting setups that don't let apps write to the local file system. This is where the <a href="https://github.com/scripting/feedlandInstall/blob/main/docs/config.md#fluses3forstorage-s3pathforstorage">config.json settings</a> are explained. 

On the S3 side, here's how you set up a bucket to serve this function for FeedLand. 

1. Static website hosting must be enabled for the bucket.

2. All "Block public access" options must be disabled.

3. If you provision a user and credentials for FeedLand (recommended), select "ACLs enabled" under "Object ownership."

4. The credentials must be supplied as environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

5. The credentials you use must have permission to read, list, and write to the S3 bucket. Here is an example policy:

```{	"Version": "2012-10-17",	"Statement": [		{			"Sid": "VisualEditor1",			"Effect": "Allow",			"Action": "s3:*",			"Resource": [				"arn:aws:s3:::bucket-name",				"arn:aws:s3:::bucket-name/*"			]		}	]}```

Thanks to <a href="https://github.com/chriszarate">chriszarate</a> for writing these notes. 

