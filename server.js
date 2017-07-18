/*jshint esversion: 6 */
const fs = require('fs');
const querystring = require('querystring');
const http = require('http');

const server = http.createServer((request, response) => {

  const {method, url} = request;
  let body = [];

  request.on('data', (chunk)=> {
    body.push(chunk);
  });

  request.on('end', ()=> {
    body = Buffer.concat(body).toString();
    if(method === 'POST'){
      var parsedBody = querystring.parse(body);
      fs.exists('/public' + url, (err, exists) => {
        if (err) throw err;
        if (exists){
        }else {
          createFile(parsedBody);
        }
      });
    }

    if(method === 'GET'){
      readFile(url);
    }
  });

  function updateIndex(file) {
    var newLi = '<li><a href="public/' + file.elementName + '.html">' + file.elementName + "</a></li>";
      fs.appendFile('public/index.html', newLi/*, file.lastIndexOf('</li>')*/,(err) => {
        if (err) throw err;
      });
  }

  function createFile(file){
    let successStatus = {'Content-Type': 'applciation/json', 'success': true};
    fs.writeFile('public/' + file.elementName + '.html',
      createdFileInfo(file), (err)=>{
        if(err) throw err;
      });
      updateIndex(file);
      response.write(JSON.stringify(successStatus));
      response.end();
  }

  function createdFileInfo(data) {
    return '<!DOCTYPE html>' + '\n' +
    '<html lang="en">' + '\n' +
    '<head>' + '\n' +
    '<meta charset="UTF-8">' + '\n' +
    '<title>The Elements - ' + data.elementName + '</title>' + '\n' +
    '<link rel="stylesheet" href="/css/styles.css">' + '\n' +
    '</head>' + '\n' +
    '<body>' + '\n' +
    '<h1>' + data.elementName + '</h1>' +'\n' +
    '<h2>' + data.elementSymbol + '</h2>' + '\n' +
    '<h3>' + data.elementAtomicNumber + '</h3>' + '\n' +
    '<p>' + data.elementDescription + '</p>' + '\n' +
    '</body>' + '\n' + '<p><a href="/">back</a></p>';
    '</html>';
  }

  function readFile(file){
    fs.readFile('public' + file, (err, data) => {
      if(data !== undefined && file !== '/404.html') {
        var moo = data.toString();
        response.write(moo);
        response.end();
      } else {
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

