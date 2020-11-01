const mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    address : {
        type : String,
    },     
    profileImg : {                         
        type : String
    },
    jobsPosted: [
        {
            type: String
        }
    ]
});

module.exports =  mongoose.model('Company', companySchema)


