const auth = require('./databaseAPI');

module.exports = {
    getalljobs,
    applytojob,
    searchjob,
    postjob,
    getjobrecommendations,
}

async function getalljobs(){
    try{
        var jobs  = await auth.get_all_jobs();
        res = {"status": "200", 'message': 'successfully fetched all users', 'data':jobs}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
    
}

async function applytojob(userId,jobId){
    try{
        await auth.apply_to_job(userId,jobId);
        res = {"status": "200", 'message': 'successfully applied to the job!', 'data':{}}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
    
}

async function searchjob(body){
    var res;
    try{
        var value = await auth.search_job(body);
        res = {"status": "200", 'message': "Feed fetched successfully!", "data": value};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}


async function postjob({body, id}){
    var res;
    try{        
        await auth.post_job({body, id});
        res = {"status": "200", 'message': 'Successfully posted job! ', "data": {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res; 
    }
}

async function getjobrecommendations(userId){
    try{
        var jobs  = await auth.get_job_recommendations(userId);
        res = {"status": "200", 'message': 'successfully fetched all recommended jobs', 'data':jobs}; 
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, "data": {}};
        return res;
    }
}