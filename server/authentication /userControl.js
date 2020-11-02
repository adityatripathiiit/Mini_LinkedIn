const auth = require('./onboarding');
module.exports = {
    loginuser,
    logincompany,
    signupuser,
    signupcompany,
    myprofile,
    updateprofile,
    getmyfeed,
    createpost,
    postjob,
    sendconnection,
    acceptconnection,
    searchjob,
    likepost,
    clappost,
    supportpost,
    applytojob,
    feedcompany,
    getjobdetails,
    endorseskill,
    viewprofile,
    deleteaccount,
    getallusers,
    // getallconnectionsposts,
    getallpendingconnections,

};


async function loginuser(req) {
    const email = req.email;
    const password =req.password;
    var res;
    try{
        const token  = await auth.login_user({email,password});
        if(token){
            res = {"status": "200", 'message': 'success', 'data':{'token' : token}}; 
            return res;
        }
        else{
            res = {"status":"400", 'message': 'Username or password is incorrect', data: {} };
            return res;
        }
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res;
    }
    
}

async function logincompany(req) {
    const email = req.email;
    const password =req.password;
    var res;
    try{
        const token = await auth.login_company({email,password});
        if(token){
            res = {"status": "200", 'message': 'success', 'data':{'token' : token}}; 
            return res;
        }
        else{
            res = {"status":"400", 'message': 'Username or password is incorrect', data: {} };
            return res;
        }

    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res;
    }
    
}

async function signupuser(req){
    var res;
    try{
        const isValid = await auth.signup_user(req);
        if(isValid == 0){
            res = {"status": "200", 'message': 'User already exists, please sign in', data: {}};    
            return res; 
        }
        res = {"status": "200", 'message': 'Account sucessfully created', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function signupcompany(req){
    var res;
    try{
        const isValid = await auth.signup_company(req);
        if(isValid ==0){
            res = {"status": "200", 'message': 'company already exists, please sign in', data: {}};    
            return res; 
        }
        res = {"status": "200", 'message': 'Account sucessfully created', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function myprofile({id, is_company}) {
    var res;
    try{
        const data = await auth.my_profile({id,is_company});
        res = {"status": "200", 'message': 'Success', data:data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function updateprofile({body, id, is_company}){
    var res;
    try{
        await auth.update_profile({body, id, is_company});
        res = {"status": "200", 'message': 'Successfully updated profile! ', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function createpost({body, id}){
    var res;
    try{        
        await auth.create_post({body, id});
        res = {"status": "200", 'message': 'Successfully created post! ', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function postjob({body, id}){
    var res;
    try{        
        await auth.post_job({body, id});
        res = {"status": "200", 'message': 'Successfully posted job! ', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function getmyfeed(id){
    var res;
    try{
        const data = await auth.get_my_feed(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", data:data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}


async function feedcompany(id){
    var res;
    try{
        const data = await auth.feed_company(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", data: data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}
async function getmyfeed(id){
    var res;
    try{
        const data = await auth.get_my_feed(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", data: data };
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}



async function sendconnection(fromId, toId){
    try {
        var res = await auth.send_connection(fromId, toId);
        res = {"status": "200", 'message': "Connection sent successfully!", data: {}};
        return res;
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function acceptconnection(fromId, toId){
    try {
        await auth.accept_connection(fromId, toId);
        return {"status": "200", 'message': "User added successfully to the network!", data: {}};
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function searchjob(body){
    var res;
    try{
        var value = await auth.search_job(body);
        res = {"status": "200", 'message': "Feed fetched successfully!", data: value};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}


async function likepost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.like_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully liked!", data: {}};
        }
        else {
            res = {"status": "300", "message": "Already liked!", data: {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function clappost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.clap_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully clapped!", data: {}};
        }
        else {
            res = {"status": "300", "message": "Already clapped!", data: {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}
async function supportpost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.support_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully supported!", data: {}};
        }
        else {
            res = {"status": "300", "message": "Already supported!", data: {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function applytojob(body){
    var res;
    try{
        await auth.apply_to_job(body);
        res = {"status": "200", "message": "Successfully applied to job!", data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}



async function getjobdetails(job_id){
    var res;
    try{
        var data = await auth.get_job_details(job_id);
        res = {"status": "200", "message": "Successfully fectched job data!", data: {jobDetail:data}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function endorseskill({user_id,endourse_id, skill_index}){
    var res;
    try{
        const valid = await auth.endorse_skill({user_id,endourse_id, skill_index});
        if(valid ==0){
            res = {"status": "400", 'message': "already endorsed, chill out", data: {}};
            return res;
        }
        res = {"status": "200", "message": "Successfully endoursed user!", data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function viewprofile(whoseId, isCompany){
    var res;
    try{
        var data = await auth.view_profile(whoseId, isCompany);
        res = {"status": "200", "message": "Successfully fectched profile!", data: data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function deleteaccount({id, is_company}) {
    var res;
    try{
        await auth.delete_account({id,is_company});
        res = {"status": "200", 'message': 'Successfully deleted Account', data: {'token': ""}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function getallusers(){
    try{
        var connections  = await auth.get_all_users();
        res = {"status": "200", 'message': 'successfully fetched all users', 'data':connections}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res;
    }
    
}
// async function getallconnectionsposts(userId){
//     try{
//         var posts  = await auth.get_all_connections_posts(userId);
//         res = {"status": "200", 'message': 'successfully fetched all posts of connections', 'data':posts}; 
//         return res;
//     }
//     catch(err){
//         console.log(err);
//         res = {"status": "400", 'message': err, data: {}};
//         return res;
//     }
    
// }


async function getallpendingconnections(userId){
    try{

        var posts  = await auth.get_all_pending_connections(userId);
        res = {"status": "200", 'message': 'successfully fetched all users', 'data':posts}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res;
    }
    
}
