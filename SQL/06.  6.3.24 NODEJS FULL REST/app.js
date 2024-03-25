const { log } = require('console');
const http = require('http');
const port = 3000

// this function will run everytime a browser 
// or a POSTMEN tries to connect to my server
const server = http.createServer( () => {
    console.log('someone browsed my server'); 
})

server.listen(port, () => {
    // this will run when my server is up.....
    console.log(`server running at http://localhost:${port}`);
})

const html_page = `
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>HELLO NODEJS!</title>
</head>

<body>
    <H1>hello nodejs!</H1>
</body>

</html>`