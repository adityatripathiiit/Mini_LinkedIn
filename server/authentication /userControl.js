// const express = require('express');
// const router = express.Router();
const auth = require('./onboarding');

// routes
// router.post('/authenticate', authenticate);
// router.post('/register', register);
// router.get('/', getAll);
// router.get('/current', getCurrent); 
// router.get('/:id', getById);
// router.put('/:id', update); 
// router.delete('/:id', _delete);

// module.exports = router;

module.exports = {
    authenticate,
    getAll,
    getCurrent,
    getById,
    register,
    update,
    _delete
};


async function authenticate(req) {
    const email = req.email;
    const password =req.password;
    var res;
    try{
        const user = await auth.authenticate({email,password});
        if(user){
            res = {"status": "200", user}; 
            return res;
        }
        else{
            res = {"status":"400", 'message': 'Username or password is incorrect' };
            return res;
        }

    }
    catch(err){
        console.log(err);
        res = {"status": "400"};
        return res;
    }
    
}

async function register(req){
    try{
        console.log(req);
        await auth.create(req);
        res = {"status": "200"};
        return res;
    }
    catch(err){
        console.log(err);
        res = {"status": "400"};
        return res;
        
    }
}

function getAll(req, res) {
    auth.getAll()
        .then(users => {res.json(users)
        console.log(res)})
        .catch(err => next(err));
}

async function getCurrent(req) {

    try{
        const user =  await auth.getById(req.user.sub);
        return user; 
    }
    catch(err){
        console.log(err);
        res = {"status": "400"};
        return res;
    }
}

function getById(req, res, next) {
    auth.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

async function update(req) {
    try{
        await auth.update(req.params.id, req.body);
    }
    catch{

    }
    
}

function _delete(req, res, next) {
    auth.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}