const commandsArray = {
        '0':'exitProgram', 
        '1':'loginUser',
        '2':'loginCompany',
        '3':'signUpUser', 
        '4':'signUpCompany', 
        '5':'logout',  
        '6':'getMyProfile',
		'7':'updateProfile',  //---
 		'8':'deleteAccount', 
		'9':'getMyFeed',       
		'10':'like',  	
		'11':'clap', 			
		'12':'support', 
		'13':'acceptConnection',    
		'14':'sendConnection',    
		'15':'postJob',  
		'16':'createPost', 
		'17':'searchJob', //---        
		'18':'feedCompany',         
		'19':'endorseSkill', //----p
		'20':'applyToJob',  
		'21':'viewProfileUser',
		'22':'viewProfileCompany', 

}

const askForData = {
	'loginUser':{
		"properties":{
			"email":{
				"required": true,				
			},
			"password":{
						"hidden":true,
						"replace": '*',
						"required": true,						
			}
		}
	},
	'loginCompany':{
		"properties":{
			"email":{	
				"required": true,
				
			},
			"password":{
					"hidden":true,
					"replace": '*',
					"required": true,
					
			}
		}
	},
	'signUpUser':{
		"properties":{
			"firstName":{
				"required": true,				
			},
			"lastName":{
				"required": true,
				//
			},
			"email":{
				"required": true,
				//
			},
			"password":{
				"hidden":true,
				"replace": '*',
				"required": true,				
			}
		}
	},
	'signUpCompany':{
		"properties":{
			"companyName":{
				"required": true,
				
				
			},	
			"description":{
				"required": true,
				
			},
			"address":{
				"required": true,
				
			},
			"email":{
				"required": true,
				
			},
			"password":{
				"hidden":true,
				"replace": '*',
				"required": true,
				
			}
		}
	},
	'postJob':{
		"properties":{			
			"jobTitle" : {
				"required": true,
				
			},
			"jobType" : {
				"required": true,
				
			},
			"jobLocation" : {
				"required": true,
				
			},
			"description" :{
				"required": true,
				
			},
			"employmentType" : {
				"required": true,
				
			},
			"industryType" : {
				"required": true,
				
			},
			"experience" : {
				"required": true,
				"type":'integer',
				
			},
			"budget":{
				"required":false				
			}
		}
	},
	"createPost":{
		"properties":{			
			"content" : {
				"required": true,
			}
		}
	},
	"sendConnection":{
		"properties":{
			"index" : {
				"required": true,				
			}
		}
	},
	"acceptConnection":{
		"properties":{
			"index" : {
				"required": true,				
			}
		}
	},
	"like":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"clap":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"support":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"applyToJob":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"viewProfileUser":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"viewProfileCompany":{
		"properties":{
			"indexOfJob":{
				"required":true,
			},
			"indexOfApplicant":{
				"required":true,
			}
		}
	}
}

module.exports.commandsArray = commandsArray;      
module.exports.askForData = askForData;      