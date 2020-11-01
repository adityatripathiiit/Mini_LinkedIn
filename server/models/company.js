const mongoose = require('mongoose');

var companySchema = mongoose.Schema({
    _id : {
      type: String,
      required: true
    },
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
        type: Strig,
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


