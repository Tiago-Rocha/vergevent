"use strict"; // jshint ignore:line

const http = require('http');

const port = 3000;

const server = http.createServer();

server.on('listening', () => {
  console.log(`Server started on port ${port}`);
});

server.on('request', (request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write('Hello world');
  response.end();
});

server.listen(port);
