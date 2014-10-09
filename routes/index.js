var verbose = process.env.NODE_ENV != 'test';
var app = module.exports = require('../node_modules/express/lib/express.js')();

app.map = function (a, route) {
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
	app.map(a[key], route + key);
	break;
      // get: function(){ ... }
      case 'function':
	if (verbose) console.log('%s %s', key, route);
	app[key](route, a[key]);
	break;
    }
  }
};

// API to be used by routeMap
var api = {
  e: { // entities
    get: function (req, res) { // lists all companies and institutions (entities), admin use only
    
    },
    post: function (req, res) { // allows for new creation of entities and  bulk creations of entities, admin use only
      
    },
    put: function (req, res) { // allows for bulk amendments of entities, admin use only
      
    },
    delete: function (req, res) { // allows for bulk deletions of entities, admin use only, with two-factor auth
      
    }
    eid: {
      get: function (req, res) { // gets the entity's profile

      },
      post: function (req, res) { // RESERVED

      },
      put: function (req, res) { // amends the entity's profile

      },
      delete: function (req, res) {  // deletes the entity's profile

      },
      u: { // users
	get: function (req, res) { // gets a list of all users, only available to admins
	  res.send('IT WORKS!');
	},
	post: function (req, res) { // used for bulk creation of users, available to admins only
	  res.send('IT WORKS!');
	},
	put: function () { // used for bulk amendment of users, available to admins only
	  res.send('IT WORKS!');
	},
	delete: function () { // DANGER: deletes all users, only available to admins, must go through a password auth, used for server cleaning
	  res.send('IT WORKS!');
	}, 
	uid: { // user id
	  get: function (req, res) { // fetches the profile of the user
	    res.send('Fetching User ID: %d', req.params.uid); 
	  },
	  post: function () { // RESERVED
	    res.send('IT WORKS!'); 
	  },
	  put: function () { // amending user profile, remember to add in the ability to change user roles
	    res.send('IT WORKS!');
	  },
	  delete: function () { // DANGER: require 2 factor auth before deletion of user
	    res.send('IT WORKS!');
	  },
	  c: { // conversations
	    post: function () { // starts a new conversation
	    // includes a JSON body that has a { 'participants': 'uid30495, uid204932, uid9192, uid39482' }
	      res.send('IT WORKS!');
	    },
	    active: {
	      get: function () { // fetches all headers of active conversations, paginated
		res.send('IT WORKS!');
	      }
	    },
	    archived: {
	      get: function () { // fetches all headers of archived conversations, paginated
		res.send('IT WORKS!');
	      }
	    },
	    cid: { // conversation id
	      get: function () { // fetches individual conversation
		res.send('IT WORKS!');
	      },
	      post: function () { // post a message to this conversation
	      // cannot exceed 5 posts per second on server and client && messages will be put on a 1s setTimeOut to be sent out
	      // includes token auth header
	      // sender gets checked to see if valid member of conversation
		res.send('IT WORKS!');
	      },
	      put: function () { // used for edited messages and deleted messages, users can only edit 5 messages per 30 minutes. All changes will be logged.
	      // deleted messages 'actionType': 'deleteMsg' will appear with string e.g. 'Message was deleted by George Yong'
	      // participants can also be added and removed by sending a 'actionType': 'addParticipant' in JSON
	      // valid rightsholders can also amend conversation options by sending a 'actionType': 'amendOptions' in JSON 
	      // participants can also resurrect archived conversations by sending a message. The archived conversation immmediately becomes active again.
		res.send('IT WORKS!');
	      },
	      delete: function () { // deletion of conversations are not allowed and conversation will only be sent to archive
		res.send('IT WORKS!');
	      }
	    }
	  },
	  watchlist: {
	    get: function () { // get watchlist of the user
	      res.send('IT WORKS!');
	    },
	    post: function () { // add an appeal to user's watchlist
	      res.send('IT WORKS!');
	    },
	    put: function () { // amend sorting, remove an appeal from the user's watchlist
	      res.send('IT WORKS!');
	    },
	    delete: function () { // clear watchlist, requiring confirmation
	      res.send('IT WORKS!');
	    }
	  },
	  lists: {
	    get: function () { // get the lists that the user currently has
	      res.send('IT WORKS!');   
	    },
	    post: function () { // add a new list, either by starting a new one, or copying another list, depending on the JSON argument
	      res.send('IT WORKS!');
	    },
	    put: function () { // amend a list, add appeals and remove appeals from a list, and change the arrangement of a list
	    // different types of JSON arguments here: add appeal, remove appeal, choose arrangement, etc
	      res.send('IT WORKS!');
	    },
	    delete: function () { // delete a list, or a selection of lists, no looping but one http request to complete multiple deletions
	      res.send('IT WORKS!');    
	    }
	  }
	}
      },
      appeals: {
	get: function () { // get all appeals paginated by 50 amounts per page, this is specifically for admin
	  res.send('IT WORKS!');   
	},
	post: function () { // mass posting of appeals by admin, must fill in all details needed via JSON in http body
	  res.send('IT WORKS!');   
	},
	put: function () { // mass editing of appeals by admin, must fill in all details needed via JSON in http body
	  res.send('IT WORKS!');   
	},
	delete: function () { // DANGER: delete all appeals, this has 3 factor auth and is only acccessible to admin
	  res.send('IT WORKS!');    
	},
	active: {
	  get: function () { // this is basically the requesting user's own appeals
	    res.send('IT WORKS!');
	  },
	  post: function () { // post a new appeal, can also post a private appeal
	    res.send('IT WORKS!');
	  },
	  put: function () { // edit the arrangement appearance of the appeals
	    res.send('IT WORKS!');		
	  },
	  delete: function () { // delete/(cancel and archive)  all appeals, requires two factor auth. If an officer has already attended to an appeal, it cannot be deleted
	    res.send('IT WORKS!');	
	  }
	},
	archived: {
	  get: function () { // gets paginated 50 per page of user's own archived appeals
	    res.send('IT WORKS!');	
	  }
	},
	aid: { // appeals id
	  get: function () { // getting the single appeal by id
	    res.send('IT WORKS!');	
	  },
	  post: function () { // posting like/comment/watch, the api route will accept JSON stating the type (like, comment or watch)
	    res.send('IT WORKS!');	
	  },
	  put: function () { // amend the appeals, title, contents, location, etc.
	    res.send('IT WORKS!');		
	  },
	  delete: function () { // delete the appeal or archive the appeal. After a officer has attended to the appeal, user cannot delete the appeal, but only archive
	    res.send('IT WORKS!');	
	  }
	},
	nearby: {
	  get: function () { // get according to the location of the requesting user
	    res.send('IT WORKS!'); 
	  }
	},
	search: {
	  searchString: { // search string could be a string or could be an id, dynamic searching supporting multiple searches within one string and different sorting
	    get: function () {
	      res.send('IT WORKS!');
	    }
	  }	
	}
      }
    }
  }
};


// Route Map
app.map({
  '/e': { // entity
    get: api.e.get,
    post: api.e.post,
    put: api.e.put,
    delete: api.e.delete,
    '/:eid': { // entity id
      '/s': { //search
	'/:ss': { // search string
	  get: api.e.eid.p.s.ss.get // search for appeals, lists, users, officers, conversations etc, universal search. This will be used to search for everything. 
	  // users can also search for appeals using 'nearby 2km', 'nearby' (which will default to 10km), and 'recent 24h', and 'recent' (which will default to 24h)
	  // client javascript will automate the above requests whenever the user zooms out of the 'Nearby' map and chooses to list 'Recent' appeals
	  // search within the conversation, for as old as the conversation may be, this is important because people want to be able to search up old convos with officials
	  // what is returned from the search will be timestamps and message numbers to give an idea of when and how fast the conversation was occuring.
	  // each message has a message id that will iterate based on the order of position (msgid), '1' indicating the first message, '2', the second and so on.
	  // say the JSON returned has the timestamp of 23438123 in UNIX epoch time, and a msgid of 2425, that means... it is the 2425th message in the convo.
	  // all searches are URL encoded just like google search, people can even postman us for APIs that are publicly shareable without logins to find out what is going on.
	  // want recent appeals? postman http://appeals.io/api/e/eid/s/appeals%20recent this is the public search api, 'recent appeals nearby' works also
	}
      },
      '/a': { // appeals
	get: api.e.eid.u.uid.a.get, // gets all of user's submitted appeals via their token auth
	post: api.e.eid.u.uid.a.post, // post new appeal by user via their token auth
	put: api.e.eid.u.uid.a.put, // edits appeals by bulk
	delete: api.e.eid.u.uid.a.delete, // deletes or archives appeals, if the appeal has been attended to, the appeal cannot be deleted, an empty appeal ID request will give a 'We're sorry, the appeal does not exist or has been deleted.'
	'/:aid': {
	  get: api.e.eid.u.uid.a.aid.get, // get data on the appeal
	  post: api.e.eid.u.uid.a.aid.post, // RESERVED
	  put: api.e.eid.u.uid.a.aid.put, // edit the appeal
	  delete: api.e.eid.u.uid.a.aid.delete // delete or archive the appeal
	},
      },
      '/c': { // conversations
	get: api.e.eid.u.uid.c.get, // for getting all conversations, active and archived are only denoted by the conversation's property in the db
	post: api.e.eid.u.uid.c.post, // for starting a new conversation
	put: api.e.eid.u.uid.c.put, // for editing conversations in bulk, whatever it may be
	delete: api.e.eid.u.uid.c.delete // for deleting conversations in bulk, two step auth
	},
	'/:cid': { // conversation id
	  get: api.e.eid.u.uid.c.cid.get, // get the latest 50 messages, this is different from push systems
	  post: api.e.eid.u.uid.c.cid.post, // post a msg to conversation, with token auth, checks if poster is valid participant, resurrect archived conversation
	  put: api.e.eid.u.uid.c.cid.put, // edits and deletes posts, add and remove participants, change conversation options
	  delete: api.e.eid.u.uid.c.cid.delete, // archives the conversation and it no longer is active
	}
      },
      '/u': { // users
	get: api.e.eid.u.get, // for getting a basic list of users, which is only for admins
	post: api.e.eid.u.post, // admin use, batch adding users, and for the system to add new users
	put: api.e.eid.u.put, // admin use, batch editing users
	delete: api.e.eid.users.delete, // admin use, batch deleting users, JSON arguments
	'/:uid': { // user id
	  get: api.e.eid.u.uid.get, // for getting all profile info
	  post: api.e.eid.u.uid.post, // NOT IN USE, reserved
	  put: api.e.eid.u.uid.put, // editing user profile
	  delete: api.e.eid.u.uid.delete, // for deleting the user profile, use with caution and layer with security
	  '/w': { // watchlists, users can only have 1 watchlist
	    get: api.e.eid.u.uid.w.get, // fetches a JSON of appeals and metadata
	    post: api.e.eid.u.uid.w.post,
	    put: api.e.eid.u.uid.w.put,
	    delete: api.e.eid.u.uid.w.delete,
	  },
	  '/l': { // lists, users can have many lists
	    get: api.e.eid.u.uid.l.get, // get all lists
	    post: api.e.eid.u.uid.l.post, // users have the option of turning their watchlist into a list, creating a new list
	    put: api.e.eid.u.uid.l.put,
	    delete: api.e.eid.u.uid.l.delete,
	    '/s': {
	      '/:ss': {
		get: api.e.eid.u.uid.l.s.ss.get // searches for lists within the users collection of lists by keywords: location, username, status etc, do first and mature it later, experience is important
	      }
	    },
	    '/lid': { // list id
	      get: api.e.eid.u.uid.l.lid.get, // gets a specific list's appeals, all items shall be paginated
	      post: api.e.eid.u.uid.l.lid.post,
	      put: api.e.eid.u.uid.l.lid.put,
	      delete: api.e.eid.u.uid.l.lid.delete
	      '/s': {
		'/:ss': {
		  get: api.e.eid.u.uid.l.lid.s.ss.get // searches for appeals within the list by keywords: location, username, status etc, do first and mature it later, experience is important
		}
	      }
	    }
	  }
	}
      }
    }
  }
});

var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});

//module.exports.api = api;

// Remember to make the application immune to DDoS attacks. Make sure there are request limits per minute for each user. No more than 1000 requests per minute for example. Otherwise, report the user at /logs/violations.txt.
