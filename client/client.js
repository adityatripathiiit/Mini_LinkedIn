const net = require('net');
const jwt = require('jsonwebtoken');
const commands = require('./commands');
const prompt = require('prompt-async');

const printInitMessage = ()=>{
  console.log('Welcome to Mini LikendIn. We support following features - ');
  console.log(JSON.stringify(commands.commandsArray)); 
};

const clientState = {
    "sendConnection":{       
       "data":null
    },    
    // feed etc.    
};

var previousResponseData = null;
var lastCommandSent = null;

var HOST = '127.0.0.1';
var PORT = 6969;

var clientToken = '';

var client = new net.Socket();

client.connect(PORT, HOST, function() {
  printInitMessage();
  const data = {"command": "", "body":"","token":clientToken};
    
  client.write(JSON.stringify(data));
});

async function takeInput(){

    prompt.start();
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
          
    const commandName = commands.commandsArray[commandKey];

    const askInput = true;    

    // reset all others to null
    for(const prop in clientState){
      if(clientState[prop] != clientState[commandName]){
        clientState[prop].data = null;
      } else {
        if(clientState[prop].data==null){

        } else {

        }
      }
    }


    var data = {};

    if(askInput && commands.askForData[commandName]){      
        data = await prompt.get(commands.askForData[commandName]); 
        
        // if(clientState[commandName]){
        //   data = {...data, "status":clientState[commandName].status};
        // }
    }     



    data = {'command': commandName , 'body':data, 'token':clientToken};

    return data;

}


client.on('data', async function(data) {    
  data = JSON.parse(data);  
    
  Object.assign(previousResponseData, data); 

  console.log('Data from server is - \n')
  console.log(data);    


  if(data.data.token != null){
    clientToken = data.data.token; 
  }
  
  var dataToSend = null;
  while(!dataToSend){
     dataToSend = await takeInput();
     if(!dataToSend) {
       console.log('\nSome error occured. \n');
       continue;
     }
  }        

  console.log('Sending this data - \n');
  console.log(dataToSend);
  client.write(JSON.stringify(dataToSend));

});

client.on('close', function() {
  console.log('Connection closed');
});