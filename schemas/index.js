var mongoose = require('mongoose');
var s; // main object to contain properties that will contain all the schemas

// Entity Schema
s.e = mongoose.Schema({
  tc: Number, // timestamp created
  te: Number, // timestamp edited
  s: String, // status, active, deleted, banned, frozen, etc
  
});

// Conversation Message Schema
s.e.c.m = mongoose.Schema({
  tc: Number, // timestamp created, since mongodb requires us to use short field names
  te: Number, // timestamp edited, no history kept, just last edited timestamp
  s: String, // status, active, if deleted this would mean msg.head and msg.body should be empty
  geo: { // geolocation
    lat: String, // latitude
    lon: String, // longitude
    alt: String, // altitude
    acc: String, // accuracy
    aA: String, // altitude accuracy
    h: String, // heading
    s: String, // speed
    t: String // timestamp at time of reading
  },
  m: { // message
    h: String, // head, could be text (literal string), img (url), music (url), video (url), location (string (lat, long)), vCard (vCard needs research, our servers will not store vCards, but only store a string of the name of the contact)
    b: String // body, if img/vid, then this is a URL, img and video assets will be from Amazon S3, we will keep all assets there with proper auth 
  }
});

s = module.exports; // this way, modules can var schemas = require(../schemas); and go schemas.e, schemas.s.e.c.m 
