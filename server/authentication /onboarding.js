const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const Company = require('../models/company'); 
const config = require('../config.json');

module.exports = {
    login_user,
    login_company,
    signup_user,
    signup_company,
    
};

async function login_user({ email, password }) {
    try{
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id, isCompany: false }, config.secret, { expiresIn: '30d' });
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
            const token = jwt.sign({ id: company._id, isCompany: true }, config.secret, { expiresIn: '30d' });
            return token;
        }
    }
    catch(err){
         throw(err);
    }
}



// async function getAll() {
//     return await User.find();
// }

// async function getById(id) {
//     return await User.findById(id);
// }

async function signup_user(userParam) {
    try{
        if (await User.findOne({ email: userParam.email })) {
            throw ('An account is already registered on the Email: ' + userParam.email );
        }
        const user = new User(userParam);
        if (userParam.password) {
            user.password = bcrypt.hashSync(userParam.password, 10);
        }
        await user.save();
    }
    catch(err){
        throw(err);
    }
}

async function signup_company(companyParam) {
    try{
        if (await Company.findOne({ email: companyParam.email })) {
            throw ('An account is already registered on the Email: ' + companyParam.email );
        }
        const company  = new Company(userParam);
        if (companyParam.password) {
            company.password = bcrypt.hashSync(companyParam.password, 10);
        }
        await company.save();
    }
    catch(err){
        throw(err);
    }
}

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw('User not found');
//     // if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
//     //     throw 'email "' + userParam.email + '" is already taken';
//     // }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.password = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
//     console.log("User created successfully");
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }