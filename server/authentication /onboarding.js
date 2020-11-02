const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const Company = require('../models/company'); 
const Post = require('../models/post'); 
const Job = require('../models/jobPosting'); 
const config = require('../config.json');


module.exports = {
    login_user,
    login_company,
    signup_user,
    signup_company,
    my_profile,
    update_profile,
    create_post,
    post_job,
    send_connection,
    get_my_feed,
    search_job,
    accept_connection,
    apply_to_job,
    feed_company,
    get_job_details,
    get_single_user,
    endorse_skill,
    delete_account,
    get_all_users,
    like_post,
    clap_post,
    support_post,
    get_all_pending_connections,
    get_single_user_company,
    get_all_jobs,
};

function sortBy(field) {
    return function(a, b) {
      return (a[field] > b[field])- (a[field] < b[field]); 
    };
}


async function login_user({ email, password }) {
    try{
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            var is_company = false;
            const token = jwt.sign({ id: user._id, is_company }, config.secret, { expiresIn: '30d' });
            return token;
        }
    }
    catch(err){
         throw(err);
    }
}

async function login_company({ email, password }) {
    try{
        const company = await Company.findOne({ email });
        if (company && bcrypt.compareSync(password, company.password)) {
            var is_company = true; 
            const token = jwt.sign({ id: company._id, is_company }, config.secret, { expiresIn: '30d' });
            return token;
        }
    }
    catch(err){
         throw(err);
    }
}


async function signup_user(userParam) {
    try{
        if (await User.findOne({ email: userParam.email })) {
            return 0 ;
        }
        const user = new User(userParam);
        if (userParam.password) {
            user.password = bcrypt.hashSync(userParam.password, 10);
        }
        await user.save();
        return 1;
    }
    catch(err){
        throw(err);
    }
}

async function signup_company(companyParam) {
    try{
        if (await Company.findOne({ email: companyParam.email })) {
            return 0;
            // throw ('An account is already registered on the Email: ' + companyParam.email );
        }
        const company  = new Company(companyParam);
        if (companyParam.password) {
            company.password = bcrypt.hashSync(companyParam.password, 10);
        }
        await company.save();
        return 1;
    }
    catch(err){
        throw(err);
    }
}

async function my_profile({id, is_company}){
    try{
        if(is_company){
            const company = await Company.findById(id);
            return company;
        }
        else{
            const user = await User.findById(id);
            return user;
        }
    }
    catch(err){
        throw(err);
    }
}

async function update_profile({body, id, is_company}) {
    try{
        var field;
            var set_field;
            for(const key in body)
            {
                field = body[key];
                if(field != '' && field != undefined && field != NULL){
                    set_field[key] = field;
                }
            }
        if(is_company){
            await Company.findByIdAndUpdate(id, {
                $set: set_field
            })
            // const company = await Company.findById(id);
            // Object.assign(company,body)
            // await company.save(); 
    
        }
        else{
            await User.findByIdAndUpdate(id, {
                $set: set_field
            })
            // const user = await User.find(id);
            // Object.assign(user,body);
            // await user.save();
        }
    }
    catch(err){
        throw(err); 
    }
}

async function create_post({body, id}) {
    try{

        var value = {
            postById: id,   
            ...body
        }
        const post = new Post(value);

        var posted_at = new Date();

        var val = await post.save(); 
        
        var post_id = val._id;
        const user = await User.findById(id);        
        const payload = {postId: post_id, postedAt: posted_at};
        user.posts.push(payload);
        await user.save();
    }
    catch(err){
        throw(err); 
    }
}

async function post_job({body, id}) {
    try{

        const company = await Company.findById(id);

        var value = {
            companyName : company.companyName,    
            companyId : id,     
            companyLogo:company.profileImg,       
            ...body
        }

        const job = new Job(value);        

        var val = await job.save(); 

        var job_id = val._id;
        var company_id = id;
        
        company.jobsPosted.push(job_id);
        await company.save();
    }
    catch(err){
        throw(err); 
    }
}

async function get_my_feed(id){
    try{
        var is_company = false;
        var data = await my_profile({ id, is_company }); 
        var connections = data.connections;        
        connections.push(id);
        var i; 
        var feed = [];
        for(i=0; i<connections.length;i++){
            var connecteeId = connections[i]; 
            var connecteeData = await User.findById(connecteeId);
            // console.log(connecteeData);
            for(var j= 0; j<connecteeData.posts.length; j++){
                var postId = connecteeData.posts[j].postId;
                var postContent = await Post.findById(postId);
                feed.push(postContent);
            }            
        }
        feed.sort(sortBy('posted_at'));
        
        // if(feed.length<=10){
        //     return feed ;
        // }

        return feed; //.slice(0,10); 
    }
    catch(err){
        throw(err);
    }
}

async function feed_company(id){
    try{
        var is_company = true;
        var job = await my_profile({ id, is_company }); 
        console.log(job);
        var jobsPosted = job.jobsPosted;
        var i; 
        var feed = [];
        for(i=0; i<jobsPosted.length;i++){
            var jobId = jobsPosted[i]; 
            var jobData = await get_job_details(jobId); 
            console.log(jobData);
            feed.push(jobData);
        }
        console.log(feed);
        feed.reverse();
        // if(feed.length<=10){
        return feed ;
        // }

        // return feed.slice(0,10); 
    }
    catch(err){
        throw(err);
    }
}

async function send_connection(fromId, toId){
    try {
        if(fromId==toId){
            throw("Both ids are same");
        }

        const fromUser = await User.findById(fromId);
        const toUser = await User.findById(toId);
        
        if(toUser.connectionRequestsReceived.includes(fromId) || fromUser.connectionRequestsSent.includes(toId)){
            throw("You have already sent request to this person");
            
        }

        if(fromUser.connectionRequestsReceived.includes(toId)){
            throw("This person has already sent you a request. Kindly accept.");
            
        }

        toUser.connectionRequestsReceived.push(fromId);
        fromUser.connectionRequestsSent.push(toId);

        await toUser.save();
        await fromUser.save();

    } catch(err){
        throw(err);
    }
}

async function accept_connection(fromId, toId){
    try {
        if(fromId==toId){
            throw("Both ids are same");
        }

        const fromUser = await User.findById(fromId);
        const toUser = await User.findById(toId);
        
        // toId must be in connectionRequestsReceived of fromUser
        if(!(fromUser.connectionRequestsReceived.includes(toId) && toUser.connectionRequestsSent.includes(fromId))) {
            throw("Invalid request");
        }        

        // then delete toId from connectionRequestsReceived (from fromUser) and delete fromId from connectionRequestsSent (from toUser)
        fromUser.connectionRequestsReceived.splice(fromUser.connectionRequestsReceived.indexOf(toId), 1);
        toUser.connectionRequestsSent.splice(toUser.connectionRequestsSent.indexOf(toUser), 1);

        // add toId in connections of fromUser
        // add fromId in connections toUser
        fromUser.connections.push(toId);
        toUser.connections.push(fromId);

        await fromUser.save();
        await toUser.save();

    } catch(err){
        throw(err);
    }
}

async function search_job(body){
    try{
        var jobs = [];
        jobs = await Job.find({ skillSet: {$in: body.skills } });
           
        if(jobs.length<=10){
            return jobs ;
        }
        return jobs.slice(0,10); 

    }
    catch(err){
        throw(err);
    }
}

async function apply_to_job(userId,jobId){
    try{
        
        const appliedJob = await Job.findById(jobId);
        const companyId = appliedJob.companyId;
        if(appliedJob.applicants.find(pair => pair.userId === userId)) {
            throw("Job already applied!");
        }
        const applied_at = new Date();
        appliedJob.applicants.push({userId: userId, appliedAt: applied_at});
        await appliedJob.save();

        const user = await User.findById(userId);
        user.appliedToJobs.push({companyId: companyId, appliedAt: applied_at});
        await user.save();
    }
    catch(err){
        throw(err);
    }
}

async function endorse_skill({user_id,endourse_id, skill_index}){
    try{
        const is_company = false ;
        var user = my_profile({ endourse_id, is_company });
        if(user.skills[skill_index].endorsedBy.includes(user_id)){
            return 0 ;    
        }
        user.skills[skill_index].endorsedBy.push();
        await user.save();
        return 1; 
    }
    catch(err){
        throw(err);
    }
}

async function get_job_details(job_id){
    try{
        var job_data = await Job.findById(job_id);
        return job_data; 
    }
    catch(err){
        throw(err);
    }
}

async function get_single_user(whoseId, userId){ 
    try {
        if(whoseId == userId){
            throw("Use viewMyProfile command to see your profile");
        }

        var user = await User.findById(whoseId);
        if(user.viewedBy.find(pair => pair.id == userId)){
          return user;  
        } 
        user.viewedBy.push({id:userId, isCompany:false});  
        await user.save();                      
        return user;
    } catch(err){
        throw(err);
    }
}


async function get_single_user_company(userId, companyId){ 
    try {
        var user = await User.findById(userId);
        if(user.viewedBy.find(pair => pair.id == companyId)){
          return user;  
        } 
        user.viewedBy.push({id:companyId, isCompany:true});  
        await user.save();                      
        return user;
    } catch(err){
        throw(err);
    }
}


async function delete_account({id, is_company}){
    try{
        if(is_company){
            await Company.findByIdAndDelete(id);
        }
        else{
            await User.findByIdAndDelete(id);
        }
    }
    catch(err){
        throw(err);
    }
}

async function get_all_users(){
    try{
       var res = [];
       res = await User.find({}, {
        "_id": 1,
        "firstName": 1,
        "lastName":1,
        "email":1
      });
      console.log(res);
      return res;
    }
    catch(err){
        throw(err);
    }
}


async function like_post({fromId, toPostId}){
    try{
        var post = await Post.findById(toPostId);
        if(post.likes.includes(fromId)){
            return 0; 
        }
        post.likes.push(fromId);
        await post.save();
        return 1;
    }
    catch(err){
        throw(err);
    }
}


async function clap_post({fromId, toPostId}){
    try{
        var post = await Post.findById(toPostId);
        if(post.claps.includes(fromId)){
            return 0; 
        }
        post.claps.push(fromId);
        await post.save ();
        return 1;
    }
    catch(err){
        throw(err);
    }
}

async function support_post({fromId, toPostId}){
    try{
        var post = await Post.findById(toPostId);
        if(post.supports.includes(fromId)){
            return 0; 
        }
        post.supports.push(fromId);
        await post.save ();
        return 1;
    }
    catch(err){
        throw(err);
    }
}


async function get_all_pending_connections(userId){
    try{
        var user = await User.findById(userId);
        var toSend = [];
        for(var i = 0; i < user.connectionRequestsReceived.length; i++){
            toSend.push({"_id":user.connectionRequestsReceived[i]}); 
        }
        return toSend; 
    }
    catch(err){
        throw(err);
    }
}
async function get_all_jobs(){
    try{
        var jobs = await Job.find();
        return jobs; 
    }
    catch(err){
        throw(err);
    }
}
