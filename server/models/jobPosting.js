var mongoose = require('mongoose');

var jobPostings = new mongoose.Schema({
    
    companyName : {
        type : String, 
        required: true
    },    
    companyId : {
        type: String,
        required: true
    },
    companyLogo : {
        type : String,
        required: false
    },
    jobTitle : {
        type : String, 
        required: true
    },
    jobType : {
        type : String, 
        required: true
    },
    jobLocation : {
        type : String, 
        required: true
    },
    numberofApplicants : {
        type : Number, 
        required: false,
        default: 0
    },
    description :{
        type : String, 
        required: true
    },
    employmentType : {
        type : String, 
        required: true 
    },
    industryType : {
        type : String, 
        required: true
    },
    experience : {
        type : Number, 
        required: true
    },
    budget : {
        type : String, 
        required: false,
        default: "Not Disclosed"
    },    
    isActive:{
        type : Boolean, 
        default : true,         
    },
    skillSet: [
        {
            type: String,
            required: true
        }
    ],
    applicants: [
        {
            userId: {
                type:String,
                required:true
            },
            appliedAt:{
                type: Date,
                required: true
            }
        }
    ]
}
,{
    timestamps: 
        { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        }
});

module.exports =  mongoose.model('jobPostings', jobPostings);
