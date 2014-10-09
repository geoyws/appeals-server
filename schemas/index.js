var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntitySchema;

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


