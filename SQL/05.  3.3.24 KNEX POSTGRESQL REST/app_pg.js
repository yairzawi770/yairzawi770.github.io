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

// GET GET/ID POST PUT DELETE 

// async function delete_table() {
//     await data_base.raw(`DROP TABLE if exists company;`);
// }


async function create_table() {
    await data_base.raw(`CREATE TABLE company (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE,`+
        `age INT NOT NULL,`+
        `address CHAR(50),`+
        `salary REAL);`);
}

function insert_rows_for_company() {
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
}

///////////////// GET
async function get_all() {
    const employees = await data_base.raw("select * from company")
    //const employees = await data_base.select('*').from('company');
    console.log(employees.rows);

    //await data_base.destroy() 
}

///////////////// POST
async function insertRow(new_employee) {
    // insert query
    // option 1
    // data_base.raw(`INSERT INTO company (name,age,address,salary)
    //                 VALUES ('${new_employee.name}', ${new_employee.age},'${new_employee.address}', ${new_employee.age});`)

    // option 2
    await data_base.raw(`INSERT INTO company (name,age,address,salary)
                    VALUES (?, ?, ?, ?);`,
        [new_employee.name, new_employee.age, new_employee.address, new_employee.age])
}

///////////////// PUT-PATCH
async function updateRow(updated_employee, id) {
    await data_base.raw(`UPDATE company set name=?,age=?,address=?,salary=? where id=?`,
        [updated_employee.name, updated_employee.age, updated_employee.address, updated_employee.salary, id])
}
///////////////// DELETE
async function deleteRow(id) {
    await data_base.raw(`DELETE FROM company where id=?`, [id])
}
///////////////// GET\id
async function get_by_id(id) {
    const employee = await data_base.raw(`select * from company where id = ${id}`)
    console.log(employee.rows);
}

let finished = false;
// create_table()
//  insert_rows_for_company()
// get_all()
// delete_table()

//  const new_employee = { name: 'David27', age: 27, address: 'Texas', salary: 85000 }
//  insertRow(new_employee)

// get_by_id(5)

// const updated_employee = { name: 'David', age: 27, address: 'Alaska', salary: 85000 }
// updateRow(updated_employee, 5)
// get_by_id(5)

// deleteRow(5)

// get_all()