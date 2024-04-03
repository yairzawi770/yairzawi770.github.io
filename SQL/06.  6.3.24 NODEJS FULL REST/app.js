const http = require('http');
const port = 4000
const knex = require('knex')

const data_base = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'postgres'
    }
})

// this function will run everytime a browser 
// or a POSTMAN tries to connect to my server ...
const server = http.createServer(async (request, response) => {
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
    else if (request.url == '/create-table' && request.method == 'POST') {
        await data_base.raw(`CREATE TABLE company (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE,`+
        `age INT NOT NULL,`+
        `address CHAR(50),`+
        `salary REAL);`);
        response.statusCode = 201;
        response.setHeader('Content-Type', 'application/json')
    }
    else if (request.url == '/employees' && request.method == 'GET') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json')

        const employees = await data_base.raw("select * from company")
        employees.rows = employees.rows.map(e =>  
            {
            e.address = e.address.trimEnd();
            return e;
        })
        // for experts - shortcut:
        //({ ...e, address: e.address.trimEnd() } ))

        console.log(employees.rows);

        response.end(`${JSON.stringify(employees.rows)}`)
    }
    else if (request.url.startsWith('/employees/') && request.method == 'GET') {
        // return employee with id == 1
        const id = request.url.split('/')[2];
        const employee = await data_base.raw(`select * from company where id = ${id}`)
        console.log(employee);     
        employee.rows.map(e =>  
            {
            e.address = e.address.trimEnd();
            return e;
        })        
        response.end(`${JSON.stringify(employee.rows)}`)   
    }    
    else if (request.url == '/employees' && request.method == 'POST') {
        // run the insert query with 5 employees
        `INSERT INTO company (name,age,address,salary)
        VALUES ('Paul', 32, 'California', 20000.00);
        INSERT INTO company (name,age,address,salary)
        VALUES ('Allen', 25, 'Texas', 15000.00);
        INSERT INTO company (name,age,address,salary)
        VALUES ('Teddy', 23, 'Norway', 20000.00);
        INSERT INTO company (name,age,address,salary)
        VALUES ('Mark', 25, 'Rich-Mond ', 65000.00);
        INSERT INTO company (name,age,address,salary)
        VALUES ('David', 27, 'Texas', 85000.00);
        INSERT INTO company (name,age,address,salary)
        VALUES ('Kim', 22, 'South-Hall', 45000.00);`
            .replaceAll('\n    ', '')
            .split(';')
            .filter(query => query)
            .forEach(async query => { await data_base.raw(query + ';') })
        response.statusCode = 201;
        response.setHeader('Content-Type', 'text/html')
        response.end(`You sent Post to /customers`)
    }    
    else if (request.url == '/employees' && request.method == 'PUT') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(`You sent Put to /customers`)
    }      
    else if (request.url == '/employees' && request.method == 'DELETE') {
        // delete the table -- drop table
        await data_base.raw(`DROP TABLE company;`);
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