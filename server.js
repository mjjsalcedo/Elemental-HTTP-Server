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
    if(method === 'POST'){
      var parsedBody = querystring.parse(body);
      fs.exists('/public' + parsedBody.elementName, (err, exists) => {
        if (err) throw err;
        if (exists){
          //add to index.html
        }else {
          createFile(parsedBody.elementName);
        }
      });
    }
   /* createFile(body);*/
    if(method === 'GET'){
    readFile(request.url);
    }
  });

  function createFile(file){
    fs.writeFile('public/' + file + '.html', 'string', (err)=>{
      if(err) throw err;
    });
  }

  function readFile(file){
    fs.readFile('public' + file, (err, data) => {
      if(data !== undefined && file !== '/404.html') {
        var moo = data.toString();
        response.write(moo);
        response.end();
      } else {
        console.log('moo');
        fs.readFile('./404.html', (err, data) => {
          var moo = data.toString();
          response.write(moo);
          response.end();
        });
      }
    });
  }

});

server.listen(8080, '0.0.0.0', () => {
  console.log('server bound');
});

