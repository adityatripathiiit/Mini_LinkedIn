const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    status : {
        type:String
    },
    title : {
        type:String
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    skills : [
        {
            skillName : {
                type:String,
            },
            endorsedBy: [
                {
                    type:String
                }
            ]
        }
    ],        
    profileImg : {                         
        type : String
    },
    connections:[
        {                    
            type:String                
        }
    ],

    // Sent not accepted
    connectionRequestsSent:[
        {
            type: String            
        }
    ],

    // Received but not accepted by this user
    connectionRequestsReceived:[
        {
            type: String            
        }
    ],

    experience : [
        {
            title:{
                type: String,
                required: true
            },
            companyName:{
                type: String,
                required: true
            },
            description:{
                type:String
            },
            startTimeStamp:{
                type: Date,
                required: true
            },            
            endTimeStamp:{
                type: Date
            }
        }
    ],
    education : [
         {
            instituteName:{
                type: String,
                required: true
            },            
            description:{
                type:String
            },
            startTimeStamp:{
                type: Date,
                required: true
            },            
            endTimeStamp:{
                type: Date
            }
         }
    ],
    appliedToJobs: [
        {
            companyId: {
                type:String,
                required: true
            },
            appliedAt:{
                type: Date,
                required: true
            } 
        }
    ],
    viewedBy: [
        {
            id: {
                type : String
            },
            isCompany : {
                type: Boolean
            }
        }
    ],
    posts: [
        {
            postId: {
                type: String, 
                required: true, 
            },
            postedAt: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports =  mongoose.model('User', userSchema)

