var app = require('express')();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// STARTING SERVER
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
// END OF STARTING SERVER

// DATABASE CONNECTION INITIALIZATION
dbURL = 'mongodb://ispaaa:sejahtera@kahana.mongohq.com:10095/app26192063';
mongoose.connect(dbURL);
mongoose.connection.on('error', function (err) {
    console.log('Database connection failed. Error: ' + err);
});
mongoose.connection.once('open', function () {
    console.log('Successfully connected to database.');
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
	console.log('Database connection terminated.');
	process.exit();
    });
});
// END OF DATABASE CONNECTION INITIALIZATION

// SCHEMAS
var ConversationMsgSchema = new Schema({
    timestamp: Number,
    geolocationData: {
	latitude: String,
	longitude: String,
	altitude: String,
	accuracy: String,
	altitudeAccuracy: String,
	heading: String,
	speed: String,
	timestamp: String
    },
    message: {
	contentType: String,
	data: String // this will be from S3, we will keep all assets there 
    }
});
// END OF SCHEMAS

