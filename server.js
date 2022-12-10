/*
 * Write your server code in this file.
 *
 * name: Nils Streedain
 * email: streedan@oregonstate.edu
 */
const http = require('http');
const fs = require('fs');

// Set port to env var, otherwise use 3000
const port = process.env.PORT || 3000;

// Create a HashMap containing all files in directory
var files = {}
const dir = './public/';
fs.readdirSync(dir).forEach(file => {						// Loop each file
	files['/' + file] = fs.readFileSync(dir + file);		// Save file to map
});

// Respond to GET request with valid file and headers
var server = http.createServer(function (req, res) {
	var url = (req.url == '/') ? '/index.html' : req.url;	// Detrunicate URL
	var valid = url in files;								// Find URL in files
	var name = valid ? url : "/404.html";					//   Found: Use URL
	var types = {											//   Not found: 404
		'html': 'text/html',
		'css': 'text/css',
		'js': 'application/javascript',
		'jpg': 'image/jpeg'
	}
	res.writeHead(valid ? 200 : 404, {						// Get code from url
		'Content-Type': types[name.split('.')[1]]			// Get type from ext
	});
	res.write(files[name]);									// Get file from map
	res.end();
});

server.listen(port, function() {
	console.log('Server is listening on port:', port);
});
