var net = require('net');
const jwt = require('jsonwebtoken');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  var data = {'Method': 'GET', 'Route': '/authenticate', "Body":{"password":"Pass", "email":"mail123@mail.com"}, "token": ""};
  client.write(JSON.stringify(data));
  
  
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
  // console.log('Response ' + data);
  data = JSON.parse(data);
  // const token = data.user.token;
  // const temp = jwt.decode(token);
  
  // console.log(temp.sub);  
  // Close the client socket completely
  client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
  console.log('Connection closed');
});""