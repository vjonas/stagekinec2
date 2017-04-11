var Kinect2 = require('kinect2'),
    express = require('express'),
fs= require('fs'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var kinect = new Kinect2();

if(kinect.open()) {
    server.listen(8000);
    console.log('Server listening on port 8000');
    console.log('Point your browser to http://localhost:8000');

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/src/app/home.component/home.component.html');
    });
var i = 0;
    kinect.on('bodyFrame', function(bodyFrame){
        io.sockets.emit('bodyFrame', bodyFrame);
	console.log(bodyFrame);
	/*var url = __dirname + "/kinectOutputs/bodyFrame" + i + ".json"
	bodyFrame =  JSON.stringify(bodyFrame, null, 2);
        fs.writeFile(url, bodyFrame, function(err){
		return console.log(err);
	});
	i++;*/
    });
    /*kinect.on('colorFrame', function(colorFrame){
        io.sockets.emit('colorFrame', colorFrame);
        console.log(colorFrame);

    });
    kinect.openColorReader();*/
    kinect.openBodyReader();
}
