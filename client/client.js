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

const privilegedCommands = ["sendConnection","acceptConnection","like","clap","support","endorseSkill","applyToJob","viewProfileUser","viewProfileCompany"];

var HOST = '127.0.0.1';
var PORT = 6969;

var clientToken = '';

var client = new net.Socket();

client.connect(PORT, HOST, function() {
  printInitMessage();
  const data = {"command": "", "body":"","token":clientToken};
    
  client.write(JSON.stringify(data));
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
      } else {
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


client.on('data', async function(data) {    
  data = JSON.parse(data);  
  
  // set only for first time
  if(clientState.firstTime && clientState.isPrivileged) clientState.data = data.data;  

  console.log('Data from server is - \n')
  console.log(util.inspect(data, {showHidden: false, depth: null}));


  if(data.data.token != null){
    clientToken = data.data.token; 
  }
  
  var dataToSend = null;
  while(!dataToSend){
     dataToSend = await takeInput();
     if(!dataToSend) {       
       continue;
     }
  }        

  console.log('Sending this data - \n');
  console.log(util.inspect(dataToSend, {showHidden: false, depth: null}));
  client.write(JSON.stringify(dataToSend));

});

client.on('close', function() {
  console.log('Connection closed');
  process.exit();
});