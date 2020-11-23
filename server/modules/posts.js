const auth = require('./databaseAPI');

module.exports = {
    createpost,
    likepost,
    clappost,
    supportpost,
    commentonpost,
}

async function createpost({body, id}){
    var res;
    try{        
        await auth.create_post({body, id});
        res = {"status": "200", 'message': 'Successfully created post! ', "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function likepost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.like_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully liked!", "data": {}};
        }
        else {
            res = {"status": "300", "message": "Already liked!", "data": {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function clappost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.clap_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully clapped!", "data": {}};
        }
        else {
            res = {"status": "300", "message": "Already clapped!", "data": {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function supportpost({fromId, toPostId}){
    var res;
    try{
        var isValid = await auth.support_post({fromId, toPostId});
        if(isValid){
            res = {"status": "200", "message": "Successfully supported!", "data": {}};
        }
        else {
            res = {"status": "300", "message": "Already supported!", "data": {}};
        }
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function commentonpost(user_id, post_id, comment_text){
    var res;
    try{
        await auth.comment_on_post(user_id, post_id, comment_text);        
        res = {"status": "200", "message": "Successfully posted comment!", "data": {}};        
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}