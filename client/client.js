const net = require('net');
const jwt = require('jsonwebtoken');
const commands = require('./commands');
const prompt = require('prompt');

prompt.start();

const printInitMessage = ()=>{
  console.log('Welcome to Mini LikendIn. We support following features - ');
  console.log(JSON.stringify(commands.commandsArray)); 
};

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();

// client.connect(PORT, HOST, function() {
//     console.log('Connected to the server \n');
    printInitMessage();
    while(1){
        prompt.get(['command'], (error, result)=>{
            const commandKey = result.command;   
            const keyFound = commands.commandsArray.hasOwnProperty(commandInput);
            if(keyFound) {
              const commandName = commands.commandsArray[commandInput];
              prompt.get(commands.askForData[commandName], (error, result)=>{
                  
              });   
            }            
        });
    }
// });



client.on('data', function(data) {  
  data = JSON.parse(data);  
  console.log(data);    
});

client.on('close', function() {
  console.log('Connection closed');
});