
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
    return jwt.verify(token, config.secret);
  }catch(err)
  {
    console.log(err);
    return 0;
  }
}

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
  // Auth
  // jwt();
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
//  sock.setNoDelay(true);
 
  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    // Write the data back to the socket, the client will receive it as data from the server
    // sock.write('You said "' + data + '"');
    var data = JSON.parse(data);
    
    // console.log(data.Method);
    if(data.Method == 'POST' && data.Route == '/register')
    {
      userControl.register(data.Body).then((res) => {
        console.log(res);
        sock.write(JSON.stringify(res));
      });
    }

    else if(data.Method == 'GET' && data.Route == '/authenticate')
    {
      userControl.authenticate(data.Body).then((res) => {
        console.log(res);
        sock.write(JSON.stringify(res));
      });
    }

    // const tok = requireLogin(data.token);
    // if(tok == 0)
    // {
    //   return;
    // }

  });
  // Add a 'close' event handler to this instance of socket
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);