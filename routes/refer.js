app.map({
  '/e': { // entity
    get: api.e.get,
    post: api.e.post,
    put: api.e.put,
    delete: api.e.delete,
    '/:eid': { // entity id
      get: api.e.eid.get,
      post: api.e.eid.post,
      put: api.e.eid.put,
      delete: api.e.eid.delete,
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
	get: api.e.eid.u.uid.c.get, // for getting all user's conversations via their token auth, active and archived are only denoted by the conversation's property in the db
	post: api.e.eid.u.uid.c.post, // for starting a new conversation
	put: api.e.eid.u.uid.c.put, // for editing conversations in bulk, whatever it may be
	delete: api.e.eid.u.uid.c.delete // for deleting or archiving conversations in bulk, two step auth
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
	  '/l': { // lists, users can have many lists and they can be public or private lists. Universal search handles the auth
	    get: api.e.eid.u.uid.l.get, // get all lists
	    post: api.e.eid.u.uid.l.post, // users have the option of turning their watchlist into a list, creating a new list
	    put: api.e.eid.u.uid.l.put,
	    delete: api.e.eid.u.uid.l.delete,
	    },
	    '/lid': { // list id
	      get: api.e.eid.u.uid.l.lid.get, // gets a specific list's appeals, all items shall be paginated
	      post: api.e.eid.u.uid.l.lid.post,
	      put: api.e.eid.u.uid.l.lid.put,
	      delete: api.e.eid.u.uid.l.lid.delete
	    }
	  }
	}
      }
    }
  }
});
