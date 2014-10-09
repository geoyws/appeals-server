var api = {
  e: { // entities
    get: function (req, res) { // lists all companies and institutions (entities), admin use only
      res.send('WHOAH IT WORKS!');
    },
    post: function (req, res) { // allows for new creation of entities and  bulk creations of entities, admin use only
      
    },
    put: function (req, res) { // allows for bulk amendments of entities, admin use only
      
    },
    delete: function (req, res) { // allows for bulk deletions of entities, admin use only, with two-factor auth
      
    },
    eid: {
      get: function (req, res) { // gets the entity's profile

      },
      post: function (req, res) { // RESERVED

      },
      put: function (req, res) { // amends the entity's profile

      },
      delete: function (req, res) {  // deletes the entity's profile

      },
      s: { // search
	ss: { // search string
	  get: function (req, res) { // searches according to search string. This is the universal search API
	    
	  }
	}
      },
      a: { // appeals
	get: function (req, res) { // get all appeals paginated by 50 amounts per page, this is specifically for admin
	  res.send('IT WORKS!');   
	},
	post: function (req, res) { // mass posting of appeals by admin, must fill in all details needed via JSON in http body
	  res.send('IT WORKS!');   
	},
	put: function (req, res) { // mass editing of appeals by admin, must fill in all details needed via JSON in http body
	  res.send('IT WORKS!');   
	},
	delete: function (req, res) { // DANGER: delete all appeals, this has 3 factor auth and is only acccessible to admin
	  res.send('IT WORKS!');    
	},
	aid: { // appeals id
	  get: function (req, res) { // getting the single appeal by id
	    res.send('IT WORKS!');	
	  },
	  post: function (req, res) { // posting like/comment/watch, the api route will accept JSON stating the type (like, comment or watch)
	    res.send('IT WORKS!');	
	  },
	  put: function (req, res) { // amend the appeals, title, contents, location, etc.
	    res.send('IT WORKS!');		
	  },
	  delete: function (req, res) { // delete the appeal or archive the appeal. After a officer has attended to the appeal, user cannot delete the appeal, but only archive
	    res.send('IT WORKS!');	
	  }
	}
      },
      c: { // conversations
	get: function (req, res) { // gets conversations of user via their token auth
	  
	},
	post: function (req, res) { // starts a new conversation for user identified via token auth
	// includes a JSON body that has a { 'participants': 'uid30495, uid204932, uid9192, uid39482' }
	  res.send('IT WORKS!');
	},
	put: function (req, res) { // edits metadata of conversations by bulk
	   
	},
	delete: function (req, res) { // deletes or archives conversations by bulk
	  
	},
	cid: { // conversation id
	  get: function (rqe, res) { // fetches individual conversation
	    res.send('IT WORKS!');
	  },
	  post: function (req, res) { // post a message to this conversation
	  // cannot exceed 5 posts per second on server and client && messages will be put on a 1s setTimeOut to be sent out
	  // includes token auth header
	  // sender gets checked to see if valid member of conversation
	    res.send('IT WORKS!');
	  },
	  put: function (req, res) { // used for edited messages and deleted messages, users can only edit 5 messages per 30 minutes. All changes will be logged.
	  // deleted messages 'actionType': 'deleteMsg' will appear with string e.g. 'Message was deleted by George Yong'
	  // participants can also be added and removed by sending a 'actionType': 'addParticipant' in JSON
	  // valid rightsholders can also amend conversation options by sending a 'actionType': 'amendOptions' in JSON 
	  // participants can also resurrect archived conversations by sending a message. The archived conversation immmediately becomes active again.
	    res.send('IT WORKS!');
	  },
	  delete: function (req, res) { // deletion of conversations are not allowed and conversation will only be sent to archive
	    res.send('IT WORKS!');
	  }
	}
      },
      u: { // users
	get: function (req, res) { // gets a list of all users, only available to admins
	  res.send('IT WORKS!');
	},
	post: function (req, res) { // used for bulk creation of users, available to admins only
	  res.send('IT WORKS!');
	},
	put: function (req, res) { // used for bulk amendment of users, available to admins only
	  res.send('IT WORKS!');
	},
	delete: function (req, res) { // DANGER: deletes all users, only available to admins, must go through a password auth, used for server cleaning
	  res.send('IT WORKS!');
	}, 
	uid: { // user id
	  get: function (req, res) { // fetches the profile of the user
	    res.send('Fetching User ID: %d', req.params.uid); 
	  },
	  post: function (req, res) { // RESERVED
	    res.send('IT WORKS!'); 
	  },
	  put: function (req, res) { // amending user profile, remember to add in the ability to change user roles
	    res.send('IT WORKS!');
	  },
	  delete: function (req, res) { // DANGER: require 2 factor auth before deletion of user
	    res.send('IT WORKS!');
	  },
	  w: { // watchlists
	    get: function (req, res) { // get watchlist of the user
	      res.send('IT WORKS!');
	    },
	    post: function (req, res) { // add an appeal to user's watchlist
	      res.send('IT WORKS!');
	    },
	    put: function (req, res) { // amend sorting, remove an appeal from the user's watchlist
	      res.send('IT WORKS!');
	    },
	    delete: function (req, res) { // clear watchlist, requiring confirmation
	      res.send('IT WORKS!');
	    }
	  },
	  l: {
	    get: function (req, res) { // get the lists that the user currently has
	      res.send('IT WORKS!');   
	    },
	    post: function (req, res) { // add a new list, either by starting a new one, or copying another list, depending on the JSON argument
	      res.send('IT WORKS!');
	    },
	    put: function (req, res) { // amend a list, add appeals and remove appeals from a list, and change the arrangement of a list
	    // different types of JSON arguments here: add appeal, remove appeal, choose arrangement, etc
	      res.send('IT WORKS!');
	    },
	    delete: function (req, res) { // delete a list, or a selection of lists, no looping but one http request to complete multiple deletions
	      res.send('IT WORKS!');    
	    },
	    lid: {
	      get: function (req, res) {},
	      post: function (req, res) {},
	      put: function (req, res) {},
	      delete: function (req, res) {},
	    }
	  }
	}
      }
    }
  }
};

module.exports = api;
