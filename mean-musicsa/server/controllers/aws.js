var AWS = require('aws-sdk'),
	s3 = new AWS.S3()

AWS.config.loadFromPath('./AwsConfig.json');

module.exports = {
	addToS3: function(req, res){
		var toAdd = {
			message: 'put me in ze bucket!'
		};

		s3.createBucket({Bucket: 'bucketName'}, function() {
		  s3.putObject(toAdd, function(err, data) {
		    if (err) {
		      console.log("Error uploading data: ", err);
		    } else {
		      console.log("Successfully uploaded: " + data);
		    }
		  });
		});
	}
}