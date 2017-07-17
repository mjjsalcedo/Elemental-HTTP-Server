/*jshint esversion: 6 */
const fs = require('fs');
const querystring = require('querystring');
const http = require('http');

const server = http.createServer((request, response) => {
  const {headers, method, url} = request;
  let body = [];
  request.on('data', (chunk)=> {
    body.push(chunk);
  });

  request.on('end', ()=> {
    body = Buffer.concat(body).toString();
  });

  response.writeHead(200, {'Content-Type': 'application/json'});

  const responseBody = {headers, method, url, body};

  response.write(JSON.stringify(responseBody));
  response.end();

  /*function findFile(file){
    fs.readFile('public/' + file, (err, data) => {
      request.write(fileContents);
      request.end();
    });
  }*/

});

server.listen(8080, '0.0.0.0', () => {
  console.log('server bound');
});