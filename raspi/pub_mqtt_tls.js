var mqtt = require('mqtt');
const fs = require('fs');
const config= require('./config/config');
console.log(config.CA_PATH,'kkkkkkk')


var caFile = fs.readFileSync(config.CA_PATH)
var keyFile = fs.readFileSync(config.KEY_PATH)
var certFile = fs.readFileSync(config.CERT_PATH)

var options={
    clientId:"",
    port:config.PORT,
    host:config.IP,
    protocol:'mqtts',
    rejectUnauthorized : false,
    ca: caFile,
    key: keyFile,
    cert: certFile,
    }

var client = mqtt.connect("mqtts://"+config.IP+":"+config.PORT, options);
console.log("connected flag  " + client.connected);
client.on("connect",function(){	
    console.log("connected  "+ client.connected);
    while(1){
        client.publish('kk', 'tetsllllkkk');
        console.log("send OK")
    }
})


// // function connect(){
// //     client.publish('presence', 'data.toString()');
// //     console.log(client.on('message', function (topic, message) {
// //         console.log(message.toString());
// //       }))
// // }
// // client.on('connect', function () {
// //   console.log('on connect');
// // });

// // connect();

// // client.on('connect', function () {
// //     client.subscribe('presence', function (err) {
// //       if (!err) {
// //         client.publish('presence', 'Hello mqtt')
// //       }
// //     })
// //   })
   
// //   client.on('message', function (topic, message) {
// //     // message is Buffer
// //     console.log(message.toString())
// //     client.end()
// //   })