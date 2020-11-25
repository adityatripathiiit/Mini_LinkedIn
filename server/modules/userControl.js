const auth = require('./databaseAPI');
module.exports = {
    login,    
    signupuser,
    signupcompany,
    myprofile,
    updateprofileuser,
    getmyfeed,
    sendconnection,
    acceptconnection,
    feedcompany,
    endorseskill,
    getsingleuser,
    deleteaccount,
    getallusers,
    getsingleusercompany,
    getallpendingconnections,
    getallusersinconnection,
    getrecommendedusers,    
};

async function login(req) {
    const email = req.email;
    const password =req.password;
    var res;
    try{
        const token  = await auth.login({email,password});
        if(token){
            res = {"status": "200", 'message': 'success', 'data':{'token' : token}}; 
            return res;
        }
        else{
            res = {"status":"400", 'message': 'Username or password is incorrect', "data": {} };
            return res;
        }
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }  
}

async function signupuser(req){
    var res;
    try{
        const isValid = await auth.signup_user(req);
        if(isValid == 0){
            res = {"status": "200", 'message': 'User already exists, please sign in', "data": {}};    
            return res; 
        }
        res = {"status": "200", 'message': 'Account sucessfully created', "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function signupcompany(req){
    var res;
    try{
        const isValid = await auth.signup_company(req);
        if(isValid ==0){
            res = {"status": "200", 'message': 'company already exists, please sign in', "data": {}};    
            return res; 
        }
        res = {"status": "200", 'message': 'Account sucessfully created', "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
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
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function updateprofileuser(body, id){
    var res;
    try{
        await auth.update_profile_user(body, id);
        res = {"status": "200", 'message': 'Successfully updated profile! ', "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function getmyfeed(id){
    var res;
    try{
        const data = await auth.get_my_feed(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", "data":data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function feedcompany(id){
    var res;
    try{
        const data = await auth.feed_company(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", "data": data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function getmyfeed(id){
    var res;
    try{
        const data = await auth.get_my_feed(id);
        res = {"status": "200", 'message': "Feed fetched successfully!", "data": data };
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function sendconnection(fromId, toId){
    try {
        var res = await auth.send_connection(fromId, toId);
        res = {"status": "200", 'message': "Connection sent successfully!", "data": {}};
        return res;
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function acceptconnection(fromId, toId){
    try {
        await auth.accept_connection(fromId, toId);
        return {"status": "200", 'message': "User added successfully to the network!", "data": {}};
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function endorseskill({user_id,endourse_id, skill_index}){
    var res;
    try{
        const valid = await auth.endorse_skill({user_id,endourse_id, skill_index});
        if(valid ==0){
            res = {"status": "400", 'message': "already endorsed, chill out", "data": {}};
            return res;
        }
        res = {"status": "200", "message": "Successfully endoursed user!", "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function getsingleuser(whoseId,userId){
    var res;
    try{
        var data = await auth.get_single_user(whoseId,userId);
        res = {"status": "200", "message": "Successfully fectched profile!", "data": data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}


async function getsingleusercompany(userId,companyId){
    var res;
    try{
        var data = await auth.get_single_user_company(userId,companyId);
        res = {"status": "200", "message": "Successfully fectched profile!", "data": data};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function deleteaccount({id, is_company}) {
    var res;
    try{
        await auth.delete_account({id,is_company});
        res = {"status": "200", 'message': 'Successfully deleted Account', "data": {'token': ""}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
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
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
    
}

async function getallpendingconnections(userId){
    try{

        var posts  = await auth.get_all_pending_connections(userId);
        res = {"status": "200", 'message': 'successfully fetched all users', 'data':posts}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    } 
}

async function getallusersinconnection(userId){
    try {
        var users  = await auth.get_all_users_in_connection(userId);
        res = {"status": "200", 'message': 'successfully fetched all users in connection', 'data':users}; 
        return res;
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
}

async function getrecommendedusers(userId){
    try {
        var users  = await auth.get_all_users_in_recommendation(userId);
        res = {"status": "200", 'message': 'successfully fetched all users in recommendation', 'data':users}; 
        return res;
    } catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
}