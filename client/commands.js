const commandsArray = {
        '0':'exitProgram',
        '1':'loginUser',
        '2':'loginCompany',
        '3':'signUpUser',
        '4':'signUpCompany',
        '5':'logout',
        '6':'getMyProfile',
        '7':'updateProfile'        
}

const askForData = {
	'loginUser':{
		"properties":{
			"email":{
				
			},
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