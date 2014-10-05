var app = require('express')();

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
    users: {
	get function () { // gets a list of all users, only available to admins
	    
	},
	post: function () { // used for bulk creation of users, available to admins only
	    
	},
	put: function () { // used for bulk amendment of users, available to admins only
	    
	},
	del: function () { // DANGER: deletes all users, only available to admins, must go through a password auth, used for server cleaning
	    
	}, 
	user: { // :uid
	    get: function () { // fetches the profile of the user
	    
	    },
	    post: function () { // creating a new user
	    
	    },
	    put: function () { // amending user profile
	    
	    },
	    del: function () { // DANGER: require 2 factor auth before deletion of user
	    
	    },
	    conversations: {
		active: {
		    get: function () { // fetches all headers of active conversations, paginated
		    
		    }
		},
		archived: {
		    get: function () { // fetches all headers of archived conversations, paginated
		    
		    }
		},
		conversation: { // :cid
		    get: function () { // fetches individual conversation
		    
		    },
		    post: function () { // post a message to this conversation
		    // cannot exceed 5 posts per second on server and client && messages will be put on a 1s setTimeOut to be sent out
		    // includes token auth header
		    // sender gets checked to see if valid member of conversation
		    },
		    put: function () { // used for edited messages and deleted messages, users can only edit 5 messages per 30 minutes. All changes will be logged.
		    // deleted messages 'actionType': 'deleteMsg' will appear with string e.g. 'Message was deleted by George Yong'
		    // participants can also be added and removed by sending a 'actionType': 'addParticipant' in JSON
		    // valid rightsholders can also amend conversation options by sending a 'actionType': 'amendOptions' in JSON 
		    // participants can also resurrect archived conversations by sending a message. The archived conversation immmediately becomes active again.
		    },
		    del: function () { // deletion of conversations are not allowed and conversation will only be sent to archive
		    
		    }
		}
		start: {
		    post: function () { // starts a new conversation
		    // includes a JSON body that has a { 'participants': 'uid30495, uid204932, uid9192, uid39482' }
		    
		    }
		}    
	    },
	    watchlist: {
		get: function () { // get watchlist of the user
		    
		},
		post: function () { // add an appeal to user's watchlist

		},
		put: function () { // amend sorting, remove an appeal from the user's watchlist
		
		},
		del: function () { // clear watchlist, requiring confirmation
		
		}
	    }
	}
    },
    appeals: {
	get: function () { // get all appeals paginated by 50 amounts per page, this is specifically for admin
	    
	},
	post: function () { // mass posting of appeals by admin, must fill in all details needed via JSON in http body
	    
	},
	put: function () { // mass editing of appeals by admin, must fill in all details needed via JSON in http body
	    
	},
	del: function () { // DANGER: delete all appeals, this has 3 factor auth and is only acccessible to admin
	    
	},
	active: {
	    get: function () { // this is basically the requesting user's own appeals

	    },
	    post: function () { // post a new appeal, can also post a private appeal

	    },
	    put: function () { // edit the arrangement appearance of the appeals
		
	    },
	    del: function () { // delete/(cancel and archive)  all appeals, requires two factor auth. If an officer has already attended to an appeal, it cannot be deleted
			
	    }
	},
	archived: {
	    get: function () { // gets paginated 50 per page of user's own archived appeals
		
	    }
	},
	'/:aid': { // appeals id
	    get: function () { // getting the single appeal by id
		
	    },
	    post: function () { // posting like/comment/watch, the api route will accept JSON stating the type (like, comment or watch)
		
	    },
	    put: function () { // amend the appeals, title, contents, location, etc.
		
	    },
	    del: function () { // delete the appeal or archive the appeal. After a officer has attended to the appeal, user cannot delete the appeal, but only archive
		
	    }
	},
	'/nearby': {
	    get: function () { // get according to the location of the requesting user
	    
	    }
	},
	'/:searchString': { // search string could be a string or could be an id, dynamic searching supporting multiple searches within one string and different sorting
	    get: function () {
	    
	    }
	}	
    }
};

// Route Mapping Initialization
var routeMap = {
    '/users': {
	get: api.users.get, // for getting a basic list of users, which is only for admins
	post: api.users.post,
	put: api.users.put,
	del: api.users.del,
	'/:uid': {
	    get: api.users.user.profile, // for getting all profile info
	    post: api.users.user.post,
	    put: api.users.user.put,
	    del: api.users.user.del, // for deleting the user profile, use with caution and layer with security
	    '/conversations': {
		'/archived': {
		    get: api.conversations.archived.list // get all headers of archived conversations, we will not allow the server to fetch all conversations, learn pagination
		},
		'/active': {
		    get: api.conversations.active.list // get all headers of active conversations
		},
		'/:cid' { // conversation id
		    get: api.conversations.cid.get // get the latest 50 messages, this is different from push systems
		    post: api.conversations.cid.post // post a message to the conversation, with token auth and checks if the poster is a valid participant, rez archived conversation
		    put: api.conversations.cid.put // edits and deletes posts, add and remove participants, change conversation options
		    del: api.conversations.cid.del // archives the conversation and it no longer is active
		},
		'/start': {
		    post: api.conversations.start.post
		}
	    }
	}
    },
    '/appeals': {
	'/:searchString': {
	    get: api.appeals.search
	}
    }
};

app.map(routeMap);

