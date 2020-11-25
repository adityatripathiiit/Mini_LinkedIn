const net = require('net');
const jwt = require('jsonwebtoken');
const commands = require('./commands');
const prompt = require('prompt-async');
const util = require('util');

const printInitMessage = ()=>{
  console.log('Welcome to Mini LikendIn. We support following features - \n');
  console.log(commands.commandsArray); 
};

const clientState = {
    "isPrivileged":false,    
    "firstTime":true,
    "whichIndex":-1,
    "data":null,
};

const privilegedCommands = ["sendConnection","acceptConnection","like","clap","support","endorseSkill","applyToJob","viewProfileUser","viewProfileCompany","connectionRecommendation","jobRecommendation","commentOnPost"];

var myArg = process.argv.slice(2);
var HOST = myArg[0];
var PORT = 6969;
const BUFF_SIZE = 2; // in bytes2

var clientToken = '';

var client = new net.Socket();

function parse_data(data){
    var sData = JSON.stringify(data);
    var enData = Buffer.from(sData, 'utf-8');
    enData = enData.toString('hex');
    
    const maxCount = enData.length/(2*BUFF_SIZE);
    for(var i =0; i<maxCount; i++){
      
      client.write(enData.slice(i*2*BUFF_SIZE, (i+1)*2*BUFF_SIZE));
    }
    // Sending End Of Instruction
    // console.log(Buffer.from('EOI', 'utf-8').toString('hex'))
    client.write(Buffer.from('EOI', 'utf-8').toString('hex'));
}


client.connect(PORT, HOST, function() {
  printInitMessage();
  var data = {"command": "", "body":"","token":clientToken};
  
  parse_data(data);


  // client.write(JSON.stringify(data));
});

function resetState(){
  clientState.isPrivileged = false;    
  clientState.whichIndex = -1;
  clientState.firstTime = true;
}

async function takeInput(){ 

    var data = {};

    var commandName;

    prompt.start();

    if(clientState.isPrivileged){

      console.log(" \n This is a priviledged command. Enter index below to execute command or type 'exit' to go back to normal command. \n");

      commandName = privilegedCommands[clientState.whichIndex];
      
      var feededData = await prompt.get(commands.askForData[commandName]);

      clientState.firstTime = false; 

      if(commandName=='viewProfileCompany'){
        var indexOfJob = feededData.indexOfJob;
        var indexOfApplicant = feededData.indexOfApplicant;
        if(indexOfJob=='exit' || indexOfApplicant=='exit'){
          resetState();
          return null;
        }
        try {
          data.index = 1;
          data.id = clientState.data[indexOfJob].applicants[indexOfApplicant].userId;
        } catch(err){
          resetState();
          return null;
        }       
      } else if(commandName=='endorseSkill'){
        var indexOfUser = feededData.indexOfUser;
        var indexOfSkill = feededData.indexOfSkill;
        if(indexOfUser=='exit' || indexOfSkill=='exit'){
          resetState();
          return null;
        }
        try {
          data.index = 1;
          data.user_id = clientState.data[indexOfUser]._id;
          data.skill_index = indexOfSkill;

        } catch(err){
          resetState();
          return null;
        }
      } else if(commandName=='commentOnPost'){
        var indexOfPost = feededData.indexOfPost;
        var commentText = feededData.commentText;
        if(indexOfPost=='exit' || commentText=='exit'){
          resetState();
          return null;
        }
        try {
          data.index = 1;
          indexOfPost = parseInt(indexOfPost);
          data.post_id = clientState.data[indexOfPost]._id;
          data.comment_text = commentText;

        } catch(err){
          resetState();
          return null;
        }
      }      
      else {
        var index = feededData.index;    
        if(index=='exit'){
          resetState();
          return null;

        } else {

          index = parseInt(index);
          if(index < 0 || index >= clientState.data.length){
            return null;
          }

          try{
            data.index = 1;
            data.id = clientState.data[index]._id; 
          } catch(err){
            resetState();
            return null;
          }               
        }
      }        
    } else {

      clientState.isPrivileged = false;    
      clientState.whichIndex = -1;
      clientState.firstTime = true;
      
      var commandKey = await prompt.get(['command']);      
      commandKey = commandKey.command;    

      if(commandKey==0){
        client.destroy();
        process.exit();
      }

      const keyFound = commands.commandsArray.hasOwnProperty(commandKey);          

      if(!keyFound){
          return null;
      }
            
      commandName = commands.commandsArray[commandKey];      
      
      const isThisPriviledged = privilegedCommands.includes(commandName);    

      if(!isThisPriviledged && commands.askForData[commandName]){      
          data = await prompt.get(commands.askForData[commandName]);   
      }     

      if(isThisPriviledged){
        clientState.whichIndex = privilegedCommands.indexOf(commandName);
        clientState.isPrivileged = true; 
        clientState.firstTime = true;     
        data.index = -1;
        data.id = "";
      }
    }    

    data = {'command': commandName , 'body':data, 'token':clientToken};

    return data;

}

var data ="";

client.on('data', async function(recvData) {   
  
  recvData = Buffer.from(recvData, 'hex').toString();
  var flag = 0;
  if(recvData.slice(-6) == '454f49'){
    flag = 1;
    var length = recvData.length;
    recvData = recvData.slice(0,length-6);
  }
  data += recvData;
    
  if(flag == 1){
    data = Buffer.from(data, 'hex').toString();
    data = JSON.parse(data); 
    
    // set only for first time
    if(clientState.firstTime && clientState.isPrivileged) clientState.data = data.data;  

    console.log('Data from server is - \n')
    console.log(util.inspect(data, {showHidden: false, depth: null}));


    if(data.data.token != null){
      clientToken = data.data.token; 
    }
    
    var dataToSend = null;
    data = "";
    while(!dataToSend){
      dataToSend = await takeInput();
      if(!dataToSend) {       
        continue;
      }
    }        

    console.log('Sending this data - \n');
    console.log(util.inspect(dataToSend, {showHidden: false, depth: null}));

    parse_data(dataToSend);
    // client.write(JSON.stringify(dataToSend));
  }

});

client.on('close', function() {
  console.log('Connection closed');
  process.exit();
});