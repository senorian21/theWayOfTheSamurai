const http = require('http');
const fs = require('fs');

let requestsCount = 0

const server = http.createServer((request, response) => {
    if (request.url !== '/favicon.ico') {
        requestsCount++
    }
    if (request.url === '/favicon.ico'){
        fs.readFile('./favicon.ico', (err, data) => {
            if (err) {
                response.write(404)
            } else {
                response.end(data);
            }
        })
        return;
    }

    switch (request.url) {
        case '/students':
            response.write('STUDENTS ')
            break;
        case '/':
        case '/courses':
            response.write('FRONT + BACK ')
            break;
        default:
            response.write('404 not found ')
    }

    response.write('IT-KAMASUTRA: ' + requestsCount);
    response.end()
})

server.listen(3003)