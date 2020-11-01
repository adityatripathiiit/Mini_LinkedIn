const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    _id : {
      type: String
    },
    postById : {
        type : String,
        required : true
    },
    content : {
        type: String,
        required : true  
    },     
    images:[
        {                         
            type : String
        }
    ],
    likes: [
        {
            type: String
        }
    ],
    claps: [
        {
            type: String
        }
    ],
    supports: [
        {
            type: String
        }
    ]    
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports =  mongoose.model('post', postSchema)

