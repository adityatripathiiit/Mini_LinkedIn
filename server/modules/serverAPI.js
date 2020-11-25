const userControl = require('./userControl');
const { parse_data} = require('./helper');
const jwt = require('jsonwebtoken');
const jobs  = require('./jobs');
const posts = require('./posts');
const user = require('../models/user');

async function signUpUser(data,sock){
    try{
        var res = await userControl.signupuser(data.body);
        console.log(res);
        parse_data(res,sock);  
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function signUpCompany(data,sock){
    try{
        var res = await userControl.signupcompany(data.body);
        console.log(res);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status" : "400", "message" : err, data: {}};
        parse_data(res,sock);
    }
}

async function login(data,sock){
    try{
        var token = data.token;
        if(token != ''){
            throw("Already logged in! Please logout to use another account!")
        }
        var res = await userControl.login(data.body);
        console.log(res);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status" : "400", "message" : err, data: {}};
        parse_data(res,sock);
    }
}

async function getMyProfile (data,sock){
    try{
        data = jwt.decode(data.token); 
        const is_company = data.is_company;
        const id = data.id;
        var res = await userControl.myprofile({id,is_company});
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function logout(sock){
    try{
        var res = {"status": "200", "message": "Successfully logged out!", data: {"token": ""}};
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function updateProfileUser(data,sock){
    try{
        const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await userControl.updateprofileuser(body, id);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function createPost(data,sock){
    try{
        const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await posts.createpost({ body, id});
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function postJob(data,sock){
    try{
        const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res;
        if(!token.is_company) {
            res = {"status": "400", "message": "Only company can post a job!", data: {}};
        } else {
            body.skillSet = body.skillSet.split(" ");
            res = await jobs.postjob({ body, id});
        }        
        parse_data(res,sock); 
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function getMyFeed(data,sock){
    try{
        const token = jwt.decode(data.token); 
        const id = token.id; 
        var res = await userControl.getmyfeed(id);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function feedCompany(data,sock){
    try{
        const token = jwt.decode(data.token); 
        const id = token.id; 
        var res = await userControl.feedcompany(id);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function sendConnection(data,sock){
    try {
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toId = data.body.id;
        if(index == -1){
            var res = await userControl.getallusers();
            parse_data(res,sock);
        }
        else{
            var res = await userControl.sendconnection(fromId, toId);
            parse_data(res,sock);
        }
    } catch(err){
        var res = {"status":"400", "message":err, data:{}};
        parse_data(res,sock);
    }      
}

async function acceptConnection(data,sock){
    try {
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toId = data.body.id;
        if(index == -1){
            var res = await userControl.getallpendingconnections(fromId);
            parse_data(res,sock);
        }
        else{
            var res = await userControl.acceptconnection(fromId, toId);
            parse_data(res,sock);
        }
    } 
    catch(err){
        var res = {"status":"400", "message":err, data:{}};
        parse_data(res,sock);
    }
}

async function searchJob(data,sock){
    try{
        const body = data.body; 
        var res = await jobs.searchjob(body);
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}
  

async function like(data,sock){
    try{
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toPostId = data.body.id;
        if(index == -1){
            var res = await userControl.getmyfeed(fromId);
            parse_data(res,sock);
        }
        else{
            var res = await posts.likepost({fromId, toPostId});
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function clap(data,sock){
    try{
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toPostId = data.body.id;
        if(index == -1){
            var res = await userControl.getmyfeed(fromId);
            parse_data(res,sock);
        }
        else{
            var res = await posts.clappost({fromId, toPostId});
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function support(data,sock){
    try{  
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toPostId = data.body.id;
        if(index == -1){
            var res = await userControl.getmyfeed(fromId);
            parse_data(res,sock);
        }
        else{
            var res = await posts.supportpost({fromId, toPostId});
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function applyToJob(data,sock){
    try{
        var index = data.body.index; 
        var userId = jwt.decode(data.token).id;
        var jobId = data.body.id;
        if(index == -1){
            var res = await jobs.getalljobs();
            parse_data(res,sock);
        }
        else{
            var res = await jobs.applytojob(userId,jobId);
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function endorseSkill(data,sock){
    try{
        var index = data.body.index;      
        var user_id = jwt.decode(data.token).id;
        if(index == -1){
            var res = await userControl.getallusersinconnection(user_id);
            parse_data(res,sock);
        } else {
            var endourse_id = data.body.user_id ;        
            var skill_index = parseInt(data.body.skill_index); 
            var res = await userControl.endorseskill({user_id,endourse_id, skill_index});
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function viewProfileUser(data,sock){
    try { 
        var index = data.body.index; 
        var userId = jwt.decode(data.token).id;
        var whoseId = data.body.id;
        if(index == -1){        
            var res = await userControl.getallusers();        
            parse_data(res,sock);
        }
        else{        
            var res = await userControl.getsingleuser(whoseId,userId);
            parse_data(res,sock);
        }
    } catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function viewProfileCompany(data,sock){
    try { 
        var index = data.body.index; 
        var companyId = jwt.decode(data.token).id;
        var userId = data.body.id;
        if(index == -1){        
            var res = await userControl.feedcompany(companyId); 
            parse_data(res,sock);
        }
        else{
            var res = await userControl.getsingleusercompany(userId,companyId);
            parse_data(res,sock);
        }
    } catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}
  
async function deleteAccount (data,sock){
    try{
        data = jwt.decode(data.token); 
        const is_company = data.is_company;
        const id = data.id;
        var res = await userControl.deleteaccount({id,is_company});
        parse_data(res,sock);
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function invalidCommand(sock){
    var res = {"status":"400", "message":"The command is invalid", data:{}};
    parse_data(res,sock);
}

async function connectionRecommendation(data,sock){
    try {
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toId = data.body.id;
        if(index == -1){            
            var res = await userControl.getrecommendedusers(fromId);
            parse_data(res,sock);
        }
        else{            
            var res = await userControl.sendconnection(fromId, toId);
            parse_data(res,sock);
        }
    } catch(err){
        var res = {"status":"400", "message":err, data:{}};
        parse_data(res,sock);
    } 
    
}

async function jobRecommendation(data,sock){
    try{
        var index = data.body.index; 
        var userId = jwt.decode(data.token).id;
        var jobId = data.body.id;
        if(index == -1){
            var res = await jobs.getjobrecommendations(userId);
            parse_data(res,sock);
        }
        else{
            var res = await jobs.applytojob(userId,jobId);
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

async function commentOnPost(data,sock){
    try{
        var index= data.body.index; 
        var user_id = jwt.decode(data.token).id;
        var post_id = data.body.post_id;
        var comment_text = data.body.comment_text;
        if(index == -1){
            var res = await userControl.getmyfeed(user_id);
            parse_data(res,sock);
        }
        else{
            var res = await posts.commentonpost(user_id, post_id, comment_text);
            parse_data(res,sock);
        }
    }
    catch(err){
        var res = {"status": "400", "message": err, data: {}};
        parse_data(res,sock);
    }
}

module.exports.signUpUser = signUpUser;
module.exports.signUpCompany = signUpCompany;
module.exports.login = login;
module.exports.getMyProfile = getMyProfile;
module.exports.logout = logout;
module.exports.updateProfileUser = updateProfileUser; 
module.exports.createPost = createPost;
module.exports.postJob = postJob;
module.exports.getMyFeed = getMyFeed; 
module.exports.feedCompany = feedCompany;
module.exports.sendConnection = sendConnection;
module.exports.acceptConnection = acceptConnection; 
module.exports.searchJob = searchJob
module.exports.like = like;
module.exports.clap = clap; 
module.exports.support = support ;
module.exports.applyToJob = applyToJob;
module.exports.endorseSkill = endorseSkill;
module.exports.viewProfileUser = viewProfileUser;
module.exports.viewProfileCompany = viewProfileCompany; 
module.exports.deleteAccount = deleteAccount; 
module.exports.invalidCommand = invalidCommand; 
module.exports.connectionRecommendation = connectionRecommendation;
module.exports.jobRecommendation = jobRecommendation;
module.exports.commentOnPost = commentOnPost;
