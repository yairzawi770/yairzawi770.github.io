const { Router } = require('express')
const router = Router()
const logger = require('../logger/my_logger')
const employees_dal = require('../dals/employees_dals')

router.get('', async (request, response) => {
    const employees = await employees_dal.get_employees()
    response.status(200).json(employees)
})

router.get('/:id', async (request, response) => {
    // add try catch
    // if /:id is zero or not a number then return 400 with the error
    // also log.error the error
    // hint: typeof value === 'number' && !isNaN(value);
    const result = await employees_dal.get_employees_by_id(request.params.id)
    response.status(200).json(result)
})

router.post('', async (request, response) => {
    const new_employee = request.body
    // await data_base.raw(`INSERT INTO company (name,age,address,salary) VALUES (?, ?, ?, ?);`,
    //     [new_employee.name, new_employee.age, new_employee.address, new_employee.age])
    const result = await employees_dal.insert_employees(new_employee)
    response.status(201).json(result)
})

router.put('/:id', async (request, response) => {
    const update_employees = request.body
    const result = await employees_dal.update_employees(update_employees, request.params.id)
    response.status(200).json(result)
})

router.patch('/:id', async (request, response) => {
    const id = request.params.id
    // const { name ,address, salary, age } = request.body
    const result = await employees_dal.patch_employee(request.body, id)
    response.status(200).json(result)
})

router.delete('/:id', async (request, response) => {
    console.log('delete-employee');
    const id = request.params.id
    const result = await employees_dal.delete_employees_by_id(id)
    response.status(200).json(result)
})

router.delete('/table/employees-delete-table', async (request, response) => {
    // delete table
    console.log('delete-table');
    const result = await employees_dal.delete_table()
    response.status(200).json(result)
})

router.post('/table/employees-create-table', async (request, response) => {
    const result = await employees_dal.create_table()
        response.status(result.code).json(result)
    }
)

router.post('/table/employees-create6', async (request, response) => {
    const result = await employees_dal.insert6_employees()
    response.status(201).json({ result: "6 new employees created" })
})

module.exports = router