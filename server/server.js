
var net = require('net');
const jwt = require('jsonwebtoken');
const userControl = require('./authentication /userControl');
const config = require('./config.json');
var HOST = '127.0.0.1';
var PORT = 6969;
// const mongoose = require('mongoose');

const connectMongo = require('./db/db'); 

connectMongo();


function requireLogin(token){
  try{
    if(token){
      return jwt.verify(token, config.secret);
    }
    return 0; 
  }catch(err)
  {
    console.log(err);
    return 0;
  }
}

net.createServer(function(sock) {

  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  //  sock.setNoDelay(true);

  async function signUpUser(data){
    try{
      var res = await userControl.signupuser(data.body);
      console.log(res);
      sock.write(JSON.stringify(res));  
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
    
  }

  async function signUpCompany(data){
    try{
      var res = await userControl.signupcompany(data.body);
      console.log(res);
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status" : "400", "message" : err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function loginUser (data){
    try{
      var res = await userControl.loginuser(data.body);
      console.log(res);
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status" : "400", "message" : err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function loginCompany (data){
    try{
      var res = await userControl.logincompany(data.body);
      console.log(res);
      sock.write(JSON.stringify(res)); 
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function myProfile (data){
    try{
      data = data.token.decode(); 
      const is_company = data.is_company;
      const id = data.id;
      var res = await userControl.myprofile({id,is_company});
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }
 
  sock.on('data', function(data) {
    // console.log('DATA ' + sock.remoteAddress + ': ' + data);
    // sock.write('You said "' + data + '"');
    
    if(requireLogin(data.token) == 0)
    {
      var res = {
        "message":  "There are 2 types of states available, 1. Login 2. Signup"
      }
      sock.write(JSON.stringify(res));
    }
    else{

      var data = JSON.parse(data);
      var command = data.command
      // console.log(data.Method);

      switch(command){
        case 'logout' : 
          logout(data); 
          break;
                            
        case 'loginUser':
          loginUser(data);
          break;
          
        case 'myProfile' :
          myProfile(data);
          break;
                      
        case 'loginCompany':
          loginCompany(data);
          break;

        case 'signUpUser':  
          signUpUser(data);
          break;
          
        case 'signUpCompany': 
          signUpCompany(data);
          break;
      }

    }
  
  });
  
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);