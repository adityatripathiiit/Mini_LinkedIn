
var net = require('net');
const jwt = require('jsonwebtoken');
const userControl = require('./authentication/userControl');
const config = require('./config.json');
var HOST = '127.0.0.1';
var PORT = 6969;

const BUFF_SIZE = 2;

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
  function parse_data(data){
    var sData = JSON.stringify(data);
    var enData = Buffer.from(sData, 'utf-8');
    enData = enData.toString('hex');
    
    const maxCount = enData.length/(2*BUFF_SIZE);
    for(var i =0; i<maxCount; i++){
      // console.log(enData.slice(i*2*BUFF_SIZE, (i+1)*2*BUFF_SIZE));
      sock.write(enData.slice(i*2*BUFF_SIZE, (i+1)*2*BUFF_SIZE));
    }
    sock.write(Buffer.from('\n', 'utf-8').toString('hex'));
  }

  async function signUpUser(data){
    try{
      var res = await userControl.signupuser(data.body);
      console.log(res);
      parse_data(res);  
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
    
  }

  async function signUpCompany(data){
    try{
      var res = await userControl.signupcompany(data.body);
      console.log(res);
      parse_data(res);
    }
    catch(err){
      var res = {"status" : "400", "message" : err, data: {}};
      parse_data(res);
    }
  }

  async function login(data){
    try{
      var res = await userControl.login(data.body);
      console.log(res);
      parse_data(res);
    }
    catch(err){
      var res = {"status" : "400", "message" : err, data: {}};
      parse_data(res);
    }
  }

  async function getMyProfile (data){
    try{
      data = jwt.decode(data.token); 
      const is_company = data.is_company;
      const id = data.id;
      var res = await userControl.myprofile({id,is_company});
      parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function logout(){
    try{
      var res = {"status": "200", "message": "Successfully logged out!", data: {"token": ""}};
      parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function updateProfileUser(data){
    try{
      const token = jwt.decode(data.token); 
      const id = token.id;
      const body = data.body; 
      var res = await userControl.updateprofileuser(body, id);
      parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function createPost(data){
    try{
      const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await userControl.createpost({ body, id});
        parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function postJob(data){
    try{
      const token = jwt.decode(data.token); 
        const id = token.id;
        const body = data.body; 
        var res = await userControl.postjob({ body, id});
        parse_data(res); 
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function getMyFeed(data){
    try{
      const token = jwt.decode(data.token); 
      const id = token.id; 
      var res = await userControl.getmyfeed(id);
      parse_data(res);
      
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function feedCompany(data){
    try{
      const token = jwt.decode(data.token); 
      const id = token.id; 
      var res = await userControl.feedcompany(id);
      parse_data(res);
      
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function sendConnection(data){
     try {
        var index= data.body.index; 
        var fromId = jwt.decode(data.token).id;
        var toId = data.body.id;
        if(index == -1){
          var res = await userControl.getallusers();
          parse_data(res);
        }
        else{
          var res = await userControl.sendconnection(fromId, toId);
          parse_data(res);
        }
        
     } catch(err){
        var res = {"status":"400", "message":err, data:{}};
        parse_data(res);
     }      
  }

  async function acceptConnection(data){
    try {

      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toId = data.body.id;
      if(index == -1){
        var res = await userControl.getallpendingconnections(fromId);
        parse_data(res);
      }
      else{
        var res = await userControl.acceptconnection(fromId, toId);
        parse_data(res);
      }
    } 
    catch(err){
      var res = {"status":"400", "message":err, data:{}};
      parse_data(res);
    }
  }

  async function searchJob(data){
    try{
      const body = data.body; 
      var res = await userControl.searchjob(body);
      parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }
  

  async function like(data){
    try{
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        parse_data(res);
      }
      else{
        var res = await userControl.likepost({fromId, toPostId});
        parse_data(res);
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }
  async function clap(data){
    try{
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        parse_data(res);
      }
      else{
        var res = await userControl.clappost({fromId, toPostId});
        parse_data(res);
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }
  async function support(data){
    try{
      
      var index= data.body.index; 
      var fromId = jwt.decode(data.token).id;
      var toPostId = data.body.id;
      if(index == -1){
        var res = await userControl.getmyfeed(fromId);
        parse_data(res);
      }
      else{
        var res = await userControl.supportpost({fromId, toPostId});
        parse_data(res);
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function applyToJob(data){
    try{
      var index = data.body.index; 
      var userId = jwt.decode(data.token).id;
      var jobId = data.body.id;
      if(index == -1){
        var res = await userControl.getalljobs();
        parse_data(res);
      }
      else{
        var res = await userControl.applytojob(userId,jobId);
        parse_data(res);
      }
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function endorseSkill(data){
    try{

      var index = data.body.index;      
      var user_id = jwt.decode(data.token).id;

      if(index == -1){
        var res = await userControl.getallusersinconnection(user_id);
        parse_data(res);
      } else {
        var endourse_id = data.body.user_id ;        
        var skill_index = parseInt(data.body.skill_index); 
        var res = await userControl.endorseskill({user_id,endourse_id, skill_index});
        parse_data(res);
      }
      
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function viewProfileUser(data){
    try { 
      var index = data.body.index; 
      var userId = jwt.decode(data.token).id;
      var whoseId = data.body.id;
      if(index == -1){        
        var res = await userControl.getallusers();        
        parse_data(res);
      }
      else{        
        var res = await userControl.getsingleuser(whoseId,userId);
        parse_data(res);
      }
    } catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  async function viewProfileCompany(data){
    try { 
      var index = data.body.index; 
      var companyId = jwt.decode(data.token).id;
      var userId = data.body.id;
      if(index == -1){        
        var res = await userControl.feedcompany(companyId); 
        parse_data(res);
      }
      else{
        var res = await userControl.getsingleusercompany(userId,companyId);
        parse_data(res);
      }
    } catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }
  

  async function deleteAccount (data){
    try{
      data = jwt.decode(data.token); 
      const is_company = data.is_company;
      const id = data.id;
      var res = await userControl.deleteaccount({id,is_company});
      parse_data(res);
    }
    catch(err){
      var res = {"status": "400", "message": err, data: {}};
      parse_data(res);
    }
  }

  

  async function invalidCommand(){
    var res = {"status":"400", "message":"The command is invalid", data:{}};
    parse_data(res);
  }
  
  var data = "";
  
  sock.on('data', async function(recvData) {
    recvData = Buffer.from(recvData, 'hex').toString();
    var flag = 0;
    if(recvData.slice(-2) == '0a'){
      flag = 1;
      var length = recvData.length;
      recvData = recvData.slice(0,length-2);
    }
    data += recvData;
    
    if(flag == 1) {
      data = Buffer.from(data, 'hex').toString();
      data = JSON.parse(data);
      console.log(data);
  
      if(data.command == 'login'){
        login(data);
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
          parse_data(res);
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
              case 'viewProfileCompany':
                viewProfileCompany(data);
                break;

              case 'getMyProfile' :
                getMyProfile(data);
                break;

              case 'deleteAccount' :
                deleteAccount(data);
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
            case 'updateProfileUser': 
              updateProfileUser(data);
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
              break;
            case 'viewProfileUser':
                viewProfileUser(data);
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
    data = "";
  }
  
  });
  
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);