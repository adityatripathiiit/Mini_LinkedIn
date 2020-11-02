
var net = require('net');
const jwt = require('jsonwebtoken');
const userControl = require('./authentication /userControl');
const config = require('./config.json');
var HOST = '127.0.0.1';
var PORT = 6969;

const connectMongo = require('./db/db'); 

connectMongo();

async function requireLogin(token){
  try{
    if(token){
      await jwt.verify(token, config.secret);
      return 1;
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

  async function getMyProfile (data){
    try{
      data = jwt.decode(data.token); 
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

  async function logout(){
    try{
      var res = {"status": "200", "message": "Successfully logged out!", data: {"token": ""}};
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function updateProfile(data){
    try{
      const token = jwt.decode(data.token); 
      const is_company = token.is_company;
      const id = token.id;
      const body = data.body; 
      var res = await userControl.updateprofile({ body, id, is_company });
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function createPost(data){
    try{
      const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await userControl.createpost({ body, id});
        sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function postJob(data){
    try{
      const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await userControl.postjob({ body, id});
        sock.write(JSON.stringify(res)); 
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function getMyFeed(data){
    try{
      const token = jwt.decode(data.token); 
      const id = token.id; 
      var res = await userControl.getmyfeed(id);
      sock.write(JSON.stringify(res));
      
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function feedCompany(data){
    try{
      const token = jwt.decode(data.token); 
      const id = token.id; 
      var res = await userControl.feedcompany(id);
      sock.write(JSON.stringify(res));
      
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function sendConnection(data){
     try {
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toId = data.body.id;
        if(index == -1){
          var res = await userControl.getallusers();
          sock.write(JSON.stringify(res));
        }
        else{
          var res = await userControl.sendconnection(fromId, toId);
          sock.write(JSON.stringify(res));
        }
        
     } catch(err){
        var res = {"status":"400", "message":err, data:{}};
        sock.write(JSON.stringify(res));
     }      
  }

  async function acceptConnection(data){
    try {

      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toId = data.body.id;
      if(index == -1){
        var res = await userControl.getallpendingconnections(fromId);
        sock.write(JSON.stringify(res));
      }
      else{
        var res = await userControl.acceptconnection(fromId, toId);
        sock.write(JSON.stringify(res));
      }
    } 
    catch(err){
      var res = {"status":"400", "message":err, data:{}};
      sock.write(JSON.stringify(res));
    }
  }

  async function searchJob(data){
    try{
      const body = data.body; 
      var res = await userControl.searchjob(body);
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }
  

  async function like(data){
    try{
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        sock.write(JSON.stringify(res));
      }
      else{
        var res = await userControl.likepost({fromId, toPostId});
        sock.write(JSON.stringify(res));
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }
  async function clap(data){
    try{
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        sock.write(JSON.stringify(res));
      }
      else{
        var res = await userControl.clappost({fromId, toPostId});
        sock.write(JSON.stringify(res));
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }
  async function support(data){
    try{
      
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        sock.write(JSON.stringify(res));
      }
      else{
        var res = await userControl.supportpost({fromId, toPostId});
        sock.write(JSON.stringify(res));
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function applyToJob(data){
    try{
      var body = data.body;
      var res = await userControl.applytojob(body);
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function endorseSkill(data){
    try{
      var body = data.body;
      var user_id = jwt.decode(data.tocken).id;
      var endourse_id = data.user_id ;
      var skill_index = data.skill_index; 
      var res = await userControl.endorseskill({user_id,endourse_id, skill_index});
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }


  async function getJobDetails(data){
    try{
      var res = await userControl.getjobdetails(data.body);
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  async function viewProfile(data, is_company){
    try { 
      var whoseId = data.body.whoseId;
      var res = await userControl.viewprofile(whoseId, is_company);
      sock.write(JSON.stringify(res));
    } catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  

  async function deleteAccount (data){
    try{
      data = jwt.decode(data.token); 
      const is_company = data.is_company;
      const id = data.id;
      var res = await userControl.deleteaccount({id,is_company});
      sock.write(JSON.stringify(res));
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      sock.write(JSON.stringify(res));
    }
  }

  

  async function invalidCommand(){
    var res = {"status":"400", "message":"The command is invalid", data:{}};
    sock.write(JSON.stringify(res));
  }


  sock.on('data', async function(data) {
    
    data = JSON.parse(data);
    console.log(data);
    if(data.command == 'loginUser'){
      loginUser(data);
    } 
    else if (data.command == 'loginCompany'){
      loginCompany(data);
    } 
    else if (data.command == 'signUpUser'){
      signUpUser(data);
    } 
    else if (data.command == 'signUpCompany'){
       signUpCompany(data);
    }
    else {
      
      if(await requireLogin(data.token) == 0){
        var res = {"status": "400", "message":  "Kindly login to continue", data: {}};
        console.log(res);
        sock.write(JSON.stringify(res));
      } else{

        var command = data.command
        var token = jwt.decode(data.token);
        var is_company = token.is_company;
        var id = token.id;
        
        if(is_company){   

          switch(command){
            case 'logout' : 
              logout(); 
              break;    

            case 'postJob':
              postJob(data);
              break;
            case 'feedCompany':
              feedCompany(data);
              break; 
            case 'getJobDetails':
              getJobDetails(data);
              break ;
            case 'viewProfile':
              viewProfile(data, true);
              break;

            case 'getMyProfile' :
              getMyProfile(data);
              break;

            case 'deleteAccount' :
              deleteAccount(data);
              break;

            case 'updateProfile': 
            updateProfile(data);
            break;
                
            default:
              invalidCommand();
              break;
          }
        } else {
          
        switch(command){
          case 'logout' : 
            logout(); 
            break;                  
            
          case 'getMyProfile' :
            getMyProfile(data);
            break;
                        
          case 'updateProfile': 
            updateProfile(data);
            break;

          case 'createPost':
            createPost(data);
            break;
            
          case 'getMyFeed':
            getMyFeed(data);
            break;
            
          case 'acceptConnection':
            acceptConnection(data);
            break;

          case 'searchJob':
            searchJob(data);
            break;
          case 'sendConnection':
            sendConnection(data);
            break;
          case 'like':
            like(data);
            break; 
          case 'clap':
            clap(data);
            break; 
          case 'support':
            support(data);
            break; 

          case 'applyToJob':
            applyToJob(data);
            break;
          case 'getJobDetails':
            getJobDetails(data);
            break ;
          
          case 'endorseSkill': 
            endorseSkill(data);
          case 'viewProfile':
              viewProfile(data, false);
              break;
          case 'deleteAccount' :
            deleteAccount(data);
            break;

          default:
              invalidCommand();
              break;
         }
        }

      }
    }
  
  });
  
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);