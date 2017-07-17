/*jshint esversion: 6 */
const fs = require('fs');
const querystring = require('querystring');
const http = require('http');

const server = http.createServer((request) => {

request.on('data', (data) => {
  findFile(data);
});

function findFile(file){
  fs.readFile('public/' + file, (err, data) => {
    var fileContents = data.toString();
  });
}

});

server.listen(8080, '0.0.0.0', () => {
  console.log('server bound');
});