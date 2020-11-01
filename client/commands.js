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
        '1':["email","password"],
        '2':["email","password"],
        '3':["firstName","lastName","email","password"],
        '4':["companyName","description","address","email","password"],
        '5':[],
        '6':[],
        '7':[],
}

module.exports.commandsArray = commandsArray;      
module.exports.askForData = askForData;      