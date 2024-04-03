const http = require('http');
const port = 4000

// this function will run everytime a browser 
// or a POSTMAN tries to connect to my server ...
const server = http.createServer((request, response) => {
    console.log(request.url);
    if (request.url == '/') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(`<html lang="en">
                        <head>
                            <title>HELLO nodejs!</title>
                        </head>
                        <body>
                            <h1 style='color:green'>Home page!</h1>
                        </body>
                        </html>
                        `)
    }
    else if (request.url == '/hello.html') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(`<html lang="en">
                                            <head>
                                                <title>HELLO nodejs!</title>
                                            </head>
                                            <body>
                                                <h1 style='color:green'>Hello page!</h1>
                                            </body>
                                            </html>
                                            `)
    }
    else if (request.url == '/customers' && request.method == 'GET') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json')
        const customer = {
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
        response.end(`${JSON.stringify(customer)}`)
    }
    else if (request.url == '/customers' && request.method == 'POST') {
        response.statusCode = 201;
        response.setHeader('Content-Type', 'text/html')
        response.end(`You sent Post to /customers`)
    }    
    else if (request.url == '/customers' && request.method == 'PUT') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(`You sent Put to /customers`)
    }      
    else if (request.url == '/customers' && request.method == 'DELETE') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(`You sent Delete to /customers`)
    }          
    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html')
        response.end(`<html lang="en">
                                            <head>
                                                <title>ERROR</title>
                                            </head>
                                            <body>
                                                <h1 style='color:red'>404: page http://localhost:${request.url} ${request.method} does not exist</h1>
                                            </body>
                                            </html>
                                            `)
    }
})

server.listen(port, () => {
    // this will run when my server is up ....
    console.log(`Server running at http://localhost:${port}`);
})

