'use strict';
const express = require('express');
const app = express();
const mic = require('mic');

var port = process.env.PORT || 1337;


app.get('/', (request, response) => {
    response.send('Hello from Orange Pi!')
});

app.get('/voice', (request, response) => {    

    var micInstance = mic({ rate: '16000', channels: '1', debug: true, exitOnSilence: 6, device: 'hw:0,0' });
    var voiceStream = micInstance.getAudioStream();

    voiceStream.on('data', function (data) {
        console.log("Recieved Input Stream: " + data.length);
    });
    voiceStream.on('error', function (err) {
        cosole.log("Error in Input Stream: " + err);
    });

    voiceStream.pipe(response);

    response.on("close", () => micInstance.stop());

    micInstance.start();
});

app.get('/configure', (request, response) => {
    response.send('Hello from Express!')
});


app.listen(port);


//const app = express();
//var port = process.env.PORT || 1337;

//app.get('/', (request, response) => {
//    response.send('Hello from Orange Pi!')
//});

//app.get('/configure', (request, response) => {
//    response.send('Hello from Express!')
//});

//app.listen(port);


//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
