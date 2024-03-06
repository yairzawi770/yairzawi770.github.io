const http = require('http');
const port = 3000

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
    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html')
        response.end(`<html lang="en">
                                            <head>
                                                <title>ERROR</title>
                                            </head>
                                            <body>
                                                <h1 style='color:red'>404: page http://localhost:${request.url} not exist</h1>
                                            </body>
                                            </html>
                                            `)
    }
})

server.listen(port, () => {
    // this will run when my server is up ....
    console.log(`Server running at http://localhost:${port}`);
})



const html_page = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HELLO nodejs!</title>
</head>
<body>
    <h1>Hello nodejs!</h1>
</body>
</html>
`