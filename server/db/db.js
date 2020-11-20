
const mongoose = require('mongoose');
const MONGO_URL = require('./constants.js').MONGO_URI;

const connectMongo = async() => {
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    }
    catch(err){
        console.log(err); 
        throw (err);
    }
}


module.exports = connectMongo;
