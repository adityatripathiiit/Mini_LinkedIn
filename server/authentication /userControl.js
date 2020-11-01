const auth = require('./onboarding');
module.exports = {
    loginuser,
    logincompany,
    signupuser,
    signupcompany,
    myprofile,


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
            res = {"status":"400", 'message': 'Username or password is incorrect', dtata: {} };
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
    try{
        await auth.signup_user(req);
        res = {"status": "200", 'message': 'Success', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function signupcompany(req){
    try{
        await auth.signup_company(req);
        res = {"status": "200", 'message': 'Success', data: {}};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}

async function myprofile({id, is_company}) {
    try{
        const data = await auth.my_profile({id,is_company});
        res = 
    }
    catch(err){
        console.log(err);
        res = {"status": "400", 'message': err, data: {}};
        return res; 
    }
}


// function getAll(req, res) {
//     auth.getAll()
//         .then(users => {res.json(users)
//         console.log(res)})
//         .catch(err => next(err));
// }

// async function getCurrent(req) {

//     try{
//         const user =  await auth.getById(req.user.sub);
//         return user; 
//     }
//     catch(err){
//         console.log(err);
//         res = {"status": "400"};
//         return res;
//     }
// }

// function getById(req, res, next) {
//     auth.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// async function update(req) {
//     try{
//         await auth.update(req.params.id, req.body);
//     }
//     catch{

//     }
    
// }

// function _delete(req, res, next) {
//     auth.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }