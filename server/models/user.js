const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id : {
      type: String
    },
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
            type : String,
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
    applieadToJobs: [
        {
            companyId: {
                type:String,
                required:true
            },
            appliedAt:{
                type: Date,
                required: true
            } 
        }
    ],
    viewedBy: [
        {
            userId: String,
            required: true
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

