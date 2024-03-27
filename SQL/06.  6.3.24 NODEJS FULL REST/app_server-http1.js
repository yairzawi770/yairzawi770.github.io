const http = require('http');
const port = 3000

// this function will run everytime a browser 
// or a POSTMEN tries to connect to my server
const server = http.createServer((request, respons) => {
    console.log(request.url);
    if (request.url == '/') {
        respons.statusCode = 201;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>HELLO NODEJS!</title>
    </head>
    
    <body>
        <H1 style='color:green'>Home page!</H1>
        <h2>you browsed to <u>${request.url}</u></h2>
    </body>
    
    </html>`)
    }

    else if (request.url == '/hello.html') {
        respons.statusCode = 200;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`<html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>HELLO NODEJS!</title>
    </head>
    
    <body>
        <H1 style='color:green'>hello nodejs!</H1>
        <h2>you browsed to <u>${request.url}</u></h2>
    </body>
    
    </html>`)
    }

    else if (request.url == '/customers' && request.method == 'GET') {
        respons.statusCode = 200;
        respons.setHeader('Content-Type', 'application/json')
        const customers = {
            "id": 123456,
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "555-1234-567",
            "address": {
                "street": "123 Elm Street",
                "city": "Anytown",
                "state": "Anystate",
                "zipCode": "12345"
            }
        }
        respons.end(`${JSON.stringify(customers)}`)
    }

    else if (request.url == '/customers' && request.method == 'POST') {
        respons.statusCode = 200;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`you sent post to /customers`)
    }

    else if (request.url == '/customers' && request.method == 'PUT') {
        respons.statusCode = 200;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`you sent Put to /customers`)
    }

    else if (request.url == '/customers' && request.method == 'DELETE') {
        respons.statusCode = 200;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`you sent Delete to /customers`)
    }

    else {
        respons.statusCode = 404;
        respons.setHeader('Content-Type', 'text/html')
        respons.end(`
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>HELLO NODEJS!</title>
    </head>
    
    <body>
        <H1 style='color:red'>404: page http://localhost:${request.url}not exist!</H1>
        <h2>you browsed to <u>${request.url}</u></h2>
    </body>
    
    </html>`)
    }
})

server.listen(port, () => {
    // this will run when my server is up.....
    console.log(`server running at http://localhost:${port}`);
})

