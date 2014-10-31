var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var s = { // s = schemas, main object to contain properties that will contain all the schemas
  _: {
    schema: function () {
      return new Schema({
	// time created is already in the _id in mongoDB, and can be extracted using mongoose.Types.ObjectId().getTimestamp() 
	c: { type: ObjectId, required: true }, // creator
	e: { type: ObjectId, required: true }, // last editor
	te: { type: Date, default: Date.now, required: true }, // time last edited
	s: { type: String, required: true }, // status, active, deleted, banned, frozen, etc
      });
    }
  },
  geo: {
    schema: function () {
      return new Schema({ // this is for geolocation, keep in mind I am not yet sure what PhoneGap will print out, so everything will be strings first
	l: { type: [ Number ], index: "2d" }, // latitude and longitude
	al: String, // altitude
	ac: String, // accuracy
	aA: String, // altitude accuracy
	h: String, // heading
	s: String, // speed
	t: String // timestamp at time of reading
      });
    }
  }, 
  c: {
    schema: function () {
      return new Schema({
	_: s._.schema(),
	p: { type: [ ObjectId ], required: true }, // participants, array of user ids
	m: { type: ObjectId, required: true } // refers to message collection dedicated for this specific conversation, this was split up in case the messages collection got too big
      });
    },
    mc: { // message collection schema
      schema: function () {
	return new Schema({
	  _: s._.schema(),
	  m: { type: [ s.c.mc.m.schema() ], required: true }
	});
      },
      m: {
	schema: function () {
	  return new Schema({
	    _: s._.schema(), // generics schema
	    geo: s.geo.schema(), // phonegap geolocation schema, this will be empty if users choose not to share their location
	    m: { // message
	      s: { type: ObjectId, required: true }, // sender could be server or userId, if the user initiated it, it would be documented under _.c, and _.e
	      t: { type: String, required: true }, // type, could be text (literal string), img (url), music (url), video (url), location (string (lat, long)), vCard (vCard needs research, our servers will not store vCards, but only store a string of the name of the contact)
	      d: { type: String, required: true } // data, if img/vid, then this is a URL, img and video assets will be from Amazon S3, we will keep all assets there with proper auth
	    }
	  });
	}
      }
    } 
  },
  e: {
    schema: function () {
      return new Schema({ // entity
	_: s._.schema(), // generics
	n: { type: String, required: true }, // name, full name of entity to be shown in profiles
	s: { type: String, required: true }, // short name, used for URL in apis
	r: { // registration, registration information
	  n: { type: String, required: true }, // registered name, according to registration
	  d: { type: Date, required: true }, // registered date, of registration
	  e: { type: Date, required: true } // registration expiry, legal information is always capitalized     
	}
      });
    }
  } 
};

//console.log(s);

module.exports = s; // this way, modules can var schemas = require(../schemas); and go schemas.e.schema, schemas.c.m.schema} 
