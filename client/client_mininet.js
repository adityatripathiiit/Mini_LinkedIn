const net = require('net');
const jwt = require('jsonwebtoken');
const commands = require('./commands');
// const prompt = require('prompt-async');
const util = require('util');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


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
    client.write(Buffer.from('\n', 'utf-8').toString('hex'));
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

function ask(questionText) {
  return new Promise((resolve, reject) => {
      readline.question(questionText, resolve);
  });
}

async function takeInput(){ 

    var data = {};

    var commandName;


    async function start() {
      feededData = await ask('');
      feededData = JSON.parse(feededData);
    }
    
    async function start1() {
      commandKey = await ask('');
    }
    async function start2() {
      data = await ask('');
      data = JSON.parse(data);
    }

    // prompt.start();

    if(clientState.isPrivileged){

      console.log(" \n This is a priviledged command. Enter index below to execute command or type 'exit' to go back to normal command. \n");

      commandName = privilegedCommands[clientState.whichIndex];
      var feededData; 
      // var feededData = await prompt.get(commands.askForData[commandName]);
      // const it = readline[Symbol.asyncIterator]();
      // feededData = await it.next();
      // readline.close()
      // feededData = JSON.parse(feededData.value);      

      
    
      await start();
      
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
      
      // var commandKey = await prompt.get(['command']);    
      var commandKey;

      // const it = readline[Symbol.asyncIterator]();
      // commandKey = await it.next();
      // readline.close()
      // commandKey = commandKey.value;
      // console.log(commandKey);   

      process.send({key:"bhejo"});
      // process.on("listening_parent", (m)=> {
      //   console.log(m);
      //   commandKey = m.key;
      // });
  
      // await start1();
      
      

      if(commandKey=='0'){
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
          // data = await prompt.get(commands.askForData[commandName]);  
          
          // const it = readline[Symbol.asyncIterator]();
          // data = await it.next();
          // data= JSON.parse(data.value);
          process.send({key:"bhejo"});
          process.on("listening_parent", (m)=> {
            data = m.key;
          });
          
          // await start2();
        
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
  if(recvData.slice(-2) == '0a'){
    flag = 1;
    var length = recvData.length;
    recvData = recvData.slice(0,length-2);
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