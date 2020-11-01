const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
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

});

module.exports =  mongoose.model('post', postSchema)
