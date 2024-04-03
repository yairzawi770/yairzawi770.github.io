const knex = require('knex')
const port = 4000
const express = require('express')
const body_parser = require('body-parser')
const path = require('path')

const app = express() // creates my server
app.use(body_parser.json()) // will help to get the body of the request 

app.use(express.static(path.join('.', '/static/'))) // allows browsing to my static folder

// app.get('/getall.html',  async (request, response) => {
//     response.sendFile(path.join(__dirname, '/static/get_all.html'))
// })

app.get('/api/employees', async (request, response) => {
    const employees = await data_base.raw("select * from company")
    employees.rows = employees.rows.map(e => {
        e.address = e.address.trimEnd();
        return e;
    })
    response.status(200).json(employees.rows)
})

app.get('/api/employees/:id', async (request, response) => {
    const id = request.params.id
    const employees = await data_base.raw(`select * from company where id = ${id}`)
    employees.rows = employees.rows.map(e => {
        e.address = e.address.trimEnd();
        return e;
    })
    response.status(200).json(employees.rows)
})

app.post('/api/employees', async (request, response) => {
    const new_employee = request.body
    await data_base.raw(`INSERT INTO company (name,age,address,salary) VALUES (?, ?, ?, ?);`,
        [new_employee.name, new_employee.age, new_employee.address, new_employee.age])
    response.status(201).json({ result: "new employee created" })
})

app.listen(port, () => {
    console.log(`=== express server is up on port ${port} ===`); 
})




const data_base = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'postgres'
    }
})