var net = require('net');
const jwt = require('jsonwebtoken');
const {requireLogin, parse_data} = require('./modules/helper');
const {
  signUpUser, 
  signUpCompany, 
  login, 
  getMyProfile, 
  logout, 
  updateProfileUser, 
  createPost,
  postJob,
  getMyFeed,
  feedCompany,
  sendConnection,
  acceptConnection,
  searchJob,
  like,
  clap,
  support,
  applyToJob,
  endorseSkill,
  viewProfileUser,
  viewProfileCompany,
  deleteAccount,
  invalidCommand,
  connectionRecommendation,
  jobRecommendation,
  commentOnPost,
} = require('./modules/serverAPI');


const connectMongo = require('./db/db'); 

var myArg = process.argv.slice(2)
var HOST = myArg[0];
var PORT = 6969;

connectMongo();


net.createServer(function(sock) {

  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

  var data = "";
  
  sock.on('data', async function(recvData) {
    recvData = Buffer.from(recvData, 'hex').toString();
    var flag = 0;
    if(recvData.slice(-6) == '454f49'){
      flag = 1;
      var length = recvData.length;
      recvData = recvData.slice(0,length-6);
    }
    data += recvData;
    
    if(flag == 1) {
      data = Buffer.from(data, 'hex').toString();
      data = JSON.parse(data);
      console.log(data);
  
      if(data.command == 'login'){
        login(data,sock);
      } 
      else if (data.command == 'signUpUser'){
        signUpUser(data,sock);
      } 
      else if (data.command == 'signUpCompany'){
        signUpCompany(data,sock);
      }
      else {
        
        if(await requireLogin(data.token) == 0){
          var res = {"status": "400", "message":  "Kindly login to continue", data: {}};
          console.log(res);
          parse_data(res,sock);
        } else{

          var command = data.command
          var token = jwt.decode(data.token);
          var is_company = token.is_company;
          var id = token.id;
          
          if(is_company){   

            switch(command){
              case 'logout' : 
                logout(sock); 
                break;    

              case 'postJob':
                postJob(data,sock);
                break;
              case 'feedCompany':
                feedCompany(data,sock);
                break; 
              case 'getJobDetails':
                getJobDetails(data,sock);
                break ;
              case 'viewProfileCompany':
                viewProfileCompany(data,sock);
                break;

              case 'getMyProfile' :
                getMyProfile(data,sock);
                break;

              case 'deleteAccount' :
                deleteAccount(data,sock);
                break;
                  
              default:
                invalidCommand(sock);
                break;
            }
          } else {
            
          switch(command){
            case 'logout' : 
              logout(sock); 
              break;                              
            case 'getMyProfile' :
              getMyProfile(data,sock);
              break;                      
            case 'updateProfileUser': 
              updateProfileUser(data,sock);
              break;
            case 'createPost':
              createPost(data,sock);
              break;            
            case 'getMyFeed':
              getMyFeed(data,sock);
              break;            
            case 'acceptConnection':
              acceptConnection(data,sock);
              break;
            case 'searchJob':
              searchJob(data,sock);
              break;
            case 'sendConnection':
              sendConnection(data,sock);
              break;
            case 'like':
              like(data,sock);
              break; 
            case 'clap':
              clap(data,sock);
              break; 
            case 'support':
              support(data,sock);
              break; 
            case 'applyToJob':
              applyToJob(data,sock);
              break;
            case 'getJobDetails':
              getJobDetails(data,sock);
              break ;          
            case 'endorseSkill': 
              endorseSkill(data,sock);
              break;
            case 'viewProfileUser':
                viewProfileUser(data,sock);
              break;
            case 'deleteAccount' :
              deleteAccount(data,sock);
              break;
            case 'connectionRecommendation':
              connectionRecommendation(data,sock);
              break;
            case 'jobRecommendation':
              jobRecommendation(data,sock);
              break;
            case 'commentOnPost':
              commentOnPost(data,sock);
              break;
            default:
              invalidCommand(sock);
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
