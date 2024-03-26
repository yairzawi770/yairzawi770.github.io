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
        respons.statusCode = 201;
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

