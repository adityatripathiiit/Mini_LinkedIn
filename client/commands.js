const commandsArray = {
        '0':'exitProgram', 
        '1':'login',        
        '2':'signUpUser', 
        '3':'signUpCompany', 
        '4':'logout',  
        '5':'getMyProfile',
		'6':'updateProfileUser',  
 		'7':'deleteAccount', 
		'8':'getMyFeed',     
		'9':'like',  	
		'10':'clap', 			
		'11':'support', 
		'12':'acceptConnection',    
		'13':'sendConnection',    
		'14':'postJob',  
		'15':'createPost', 
		'16':'searchJob',
		'17':'feedCompany',         
		'18':'endorseSkill', 
		'19':'applyToJob',  
		'20':'viewProfileUser',
		'21':'viewProfileCompany', 		
		'22':'connectionRecommendation',
		'23':'jobRecommendation',  
		'24':'commentOnPost'
}

const askForData = {
	'login':{
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
				"required":false,				
			},
			"skillSet":{
				"required":false,
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
	},
	"updateProfileUser":{
		"properties":{
			"status":{
				"required": false
			},
			"title":{
				"required": false
			},
			"address":{
				"required": false
			},
			"skills":{
				"required":false
			}
		}
	},
	"searchJob":{
		"properties":{
			"skills":{
				"required":false
			}
		}
	},
	"endorseSkill":{
		"properties":{
			"indexOfUser":{
				"required":true,				
			},
			"indexOfSkill":{
				"required":true,				
			}
		}
	},
	"connectionRecommendation":{
		"properties":{
			"index":{
				"required":true,
			}
		}
	},
	"jobRecommendation":{
		"properties":{
			"index":{
				"required":true
			}
		}
	},
	"commentOnPost":{
		"properties":{
			"indexOfPost":{
				"required":true
			},
			"commentText":{
				"required":true
			}
		}
	}
}

module.exports.commandsArray = commandsArray;      
module.exports.askForData = askForData;      