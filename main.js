const http = require('http');
const url = require('url');
const status = require('http').STATUS_CODES;

let count = 0;
const server = http.createServer((request, response) => {
    count++;
    if (request.url === '/hello') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write('Привет');
    } else if (request.url === '/count') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(count.toString());
    } else if (request.url === '/random') {
        let random = Math.floor(Math.random() * 100);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(random.toString());
    } else if (request.url === '/date') {
        let date = new Date();
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(date.toString());
    } else {
        response.statusCode = 404;
        response.write(status[404]);
    }
    response.end();
});
server.listen(3000);