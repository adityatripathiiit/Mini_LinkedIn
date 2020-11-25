const jwt = require('jsonwebtoken');
const config = require('../config.json');

const BUFF_SIZE = 2;


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

function parse_data(data, sock){
    var sData = JSON.stringify(data);
    var enData = Buffer.from(sData, 'utf-8');
    enData = enData.toString('hex');
    
    const maxCount = enData.length/(2*BUFF_SIZE);
    for(var i =0; i<maxCount; i++){
      // console.log(enData.slice(i*2*BUFF_SIZE, (i+1)*2*BUFF_SIZE));
      sock.write(enData.slice(i*2*BUFF_SIZE, (i+1)*2*BUFF_SIZE));
    }
    sock.write(Buffer.from('EOI', 'utf-8').toString('hex'));
}

module.exports.requireLogin = requireLogin;
module.exports.parse_data = parse_data;