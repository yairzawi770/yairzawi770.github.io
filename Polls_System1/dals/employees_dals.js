const knex = require('knex')
const config = require('config')
const logger = require('../logger/my_logger')

const data_base = knex({
    client: 'pg',
    connection: {
        host: config.db_connection.host,
        user: config.db_connection.user,
        password: config.db_connection.password,
        database: config.db_connection.database
    }
})


async function get_employees() {
    const employees = await data_base.raw("select * from company")
    employees.rows = employees.rows.map(e => {
        e.address = e.address.trimEnd();
        return e;
    })
    logger.debug(`app.get /api/employees number of records: ${employees.rows.length}`)
    //         response.status(200).json(employees.rows)
    return employees.rows
}
async function get_employees_by_id(id) {
    // add try catch
    // if /:id is zero or not a number then return 400 with the error
    // also log.error the error
    // hint: typeof value === 'number' && !isNaN(value);
    const employees = await data_base.raw(`select * from company where id = ${id}`)
    employees.rows = employees.rows.map(e => {
        e.address = e.address.trimEnd();
        return e;
    })
    return employees.rows[0]
}


async function insert_employees(new_employee) {
    try {
        // await data_base.raw(`INSERT INTO company (name,age,address,salary) VALUES (?, ?, ?, ?);`,
        //     [new_employee.name, new_employee.age, new_employee.address, new_employee.age])
        delete new_employee.id
        console.log(new_employee);
        const result_ids = await data_base('company').insert(new_employee).returning('id');
        console.log(result_ids[0]);

        const id = result_ids[0].id
        return { new: { id, ...new_employee }, url: `/api/employees/${id}` }
        // ...new_employee ==>   name: "Paul!", age: 32, address: "California!", salary: 20000
        // {...new_employee} ==>  { name: "Paul!", age: 32, address: "California!", salary: 20000 }
        // {id: result_ids[0].id, ...new_employee} ==>  
        //            { id: 14, name: "Paul!", age: 32, address: "California!", salary: 20000 }
        // /api/employees/8
    }
    catch (e) {
        logger.error(`Error in api post /api/employee. error = ${e.message}.`)
        return { status: "Failed to insert new employee", error: e.message.replaceAll("\"", "'") }
    }
}

async function update_employees(updated_employee, id) {
    const result = await data_base.raw(`UPDATE company set name=?,age=?,address=?,salary=? where id=?`,
        [updated_employee.name, updated_employee.age, updated_employee.address ? updated_employee.address : '', updated_employee.salary, id])
    return { result: result.rowCount ? "employee updated" : "employee not found" }
}

async function patch_employees(patch_employee, id) {
    // const { name ,address, salary, age } = request.body
    const query = []
    for (key in patch_employee) {
        query.push(`${key}='${patch_employee[key]}'`)
    }

    if (query.length > 0) {
        const query1 = `UPDATE company set ${query.join(', ')} where id=${id}`
        logger.debug(`app.patch employee ${query1}`)
        await data_base.raw(query1)
        return { result: "employee patched" }
    }
    return { result: "empty employee" }
}

async function delete_employees_by_id(id) {
    const result = await data_base.raw(`DELETE from company where id=${id}`)
    console.log(result);
    return { result: result.rowCount ? "employee deleted" : "employee not found" }
}

async function delete_table() {
    // delete table
    await data_base.raw(`DROP table company`)
    return { status: "table-deleted" }
}

async function create_table(){
    try {
        await data_base.raw(`CREATE TABLE company (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE,` +
            `age INT NOT NULL,` +
            `address CHAR(50),` +
            `salary REAL);`);
        return { status: "table-created", code: 201 }
    }
    catch (e) {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Use 24-hour clock
        });
        const formattedDate = formatter.format(date).replace(/,/, '');
        console.log(`${formattedDate}.${date.getMilliseconds().toString().padStart(3, '0')} Error in employees-create-table. error = ${e} `);
        if (e.message.includes('already exists')) {
            logger.error(`Error in employees-create-table. error = ${e.message}.`)
          return { status: "Failed to create table", error: e.message.replaceAll("\"", "'"), code: 400 }
        }
        else {
            const case_number = Math.floor(Math.random() * 1000000) + 1000000
            logger.error(`Case number (${case_number}): Error in employees-create-table. ${e.message}.`)
          return {
                status: "Failed to create table", error: `Internal error. please contact support ${case_number}`,
                time: Date(), 
                code: 500
            }
        }
    }
}

async function insert6_employees(){
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
   return { result: "6 new employees created" }
}

module.exports = { get_employees, get_employees_by_id, insert_employees,
                  update_employees, patch_employees, delete_employees_by_id,
                   delete_table, create_table, insert6_employees }