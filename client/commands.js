const commandsArray = {
        '0':'exitProgram',
        '1':'loginUser',
        '2':'loginCompany',
        '3':'signUpUser',
        '4':'signUpCompany',
        '5':'logout',
        '6':'getMyProfile', 
		'7':'updateProfile',
 		'8':'deleteAccount',
		'9':'getMyFeed',
		'10':'like',
		'11':'clap',
		'12':'support',
		'13':'acceptConnection',
		'14':'sendConnection',
		'15':'postJob',
		'16':'createPost',
		'17':'searchJob',
		'18':'feedCompany', 
		'19':'endorseSkill', 
		'20':'applyToJob',
		'21':'viewProfile', 
		'22':'getJobDetails', 

}

const askForData = {
	'loginUser':{
		"properties":{
			"email":{},
			"password":{
						"hidden":true,
						"replace": '*'
			}
		}
	},
	'loginCompany':{
		"properties":{
			"email":{
				
			},
			"password":{
					"hidden":true,
					"replace": '*'
			}
		}
	},
	'signUpUser':{
		"properties":{
			"firstName":{
				
			},
			"lastName":{
				
			},
			"email":{
				
			},
			"password":{
				"hidden":true,
                "replace": '*'
			}
		}
	},
	'signUpCompany':{
		"properties":{
			"companyName":{
				
			},
			"description":{
				
			},
			"address":{
				
			},
			"email":{
				
			},
			"password":{
				"hidden":true,
                                "replace": '*'
			}
		}
	},
	'logout':{},
	'getMyProfile':{},
	'updateProfile':{}
}

module.exports.commandsArray = commandsArray;      
module.exports.askForData = askForData;      