const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const config = require('../config.json');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    try{
        console.log("Email "+ email); 
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '30d' });
            return {
                ...user.toJSON(),
                token
            };
        }
    }
    catch(err){
         throw(err);
        }
    
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    try{
        console.log(userParam.email);
        if (await User.findOne({ email: userParam.email })) {
            
            throw ('An account is already registered on the Email: ' + userParam.email );
        }
        const user = new User(userParam);
        if (userParam.password) {
            user.password = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
    catch(err){
        throw(err);
    }
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw('User not found');
    // if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
    //     throw 'email "' + userParam.email + '" is already taken';
    // }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    console.log("User created successfully");
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}