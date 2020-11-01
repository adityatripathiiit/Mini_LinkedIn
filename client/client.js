const net = require('net');
const jwt = require('jsonwebtoken');
const commands = require('./commands');
const prompt = require('prompt-async');

const printInitMessage = ()=>{
  console.log('Welcome to Mini LikendIn. We support following features - ');
  console.log(JSON.stringify(commands.commandsArray)); 
};

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
    var data = await prompt.get(commands.askForData[commandName]); 

    data = {'command': commandName , 'body':data, 'token':''};

    return data;

}


client.on('data', async function(data) {    
  data = JSON.parse(data);   

  console.log('Data from server is - \n'+JSON.stringify(data)+'\n');    
  
  var dataToSend = null;
  while(!dataToSend){
     dataToSend = await takeInput();
     if(!dataToSend) {
       console.log('\nSome error occured. \n');
       continue;
     }
  }        

  console.log('Sending this data - \n'+JSON.stringify(dataToSend)+'\n');
  client.write(JSON.stringify(dataToSend));

});

client.on('close', function() {
  console.log('Connection closed');
});