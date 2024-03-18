const knex = require('knex')

const data_base = knex({
    client: 'sqlite3',
    connection: {
        //filename: 'our_db.db'
        filename: ':memory:'
    },
    useNullAsDefault: true
})

// GET GET/ID POST PUT DELETE 

async function delete_table() {
    await data_base.raw(`DROP TABLE IF EXISTS COMPANY`);
}


async function create_table() {
    data_base.schema.createTableIfNotExists
    await data_base.raw(`CREATE TABLE IF NOT EXISTS COMPANY (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            NAME TEXT NOT NULL,
            AGE INT NOT NULL,
            ADDRESS CHAR(50),
            SALARY REAL);`);
}

function insert_rows_for_company() {
    `INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Paul', 32, 'California', 20000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Allen', 25, 'Texas', 15000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Teddy', 23, 'Norway', 20000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Mark', 25, 'Rich-Mond ', 65000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('David', 27, 'Texas', 85000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Kim', 22, 'South-Hall', 45000.00);`
        .replaceAll('\n    ', '')
        .split(';')
        .filter(query => query)
        .forEach(async query => { await data_base.raw(query + ';') })
}

///////////////// GET
async function get_all() {
    const employees = await data_base.raw("select * from COMPANY")
    //const employees = await data_base.select('*').from('COMPANY');
    console.log(employees);

    //await data_base.destroy() 
}

///////////////// POST
async function insertRow(new_employee) {
    // insert query
    // option 1
    // data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    //                 VALUES ('${new_employee.NAME}', ${new_employee.AGE},'${new_employee.ADDRESS}', ${new_employee.AGE});`)

    // option 2
    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
                    VALUES (?, ?, ?, ?);`,
        [new_employee.NAME, new_employee.AGE, new_employee.ADDRESS, new_employee.AGE])
}

///////////////// PUT-PATCH
async function updateRow(updated_employee, id) {
    await data_base.raw(`UPDATE COMPANY set NAME=?,AGE=?,ADDRESS=?,SALARY=? where id=?`,
        [new_employee.NAME, new_employee.AGE, new_employee.ADDRESS, new_employee.SALARY, id])
}
///////////////// DELETE
async function deleteRow(id) {
    await data_base.raw(`DELETE FROM COMPANY where id=?`, [id])
}
///////////////// GET\id
async function get_by_id(id) {
    const employee = await data_base.raw(`select * from COMPANY where id = ${id}`)
    console.log(employee);
}

let finished = false;
delete_table()
create_table()
insert_rows_for_company()
get_all()

const new_employee = { NAME: 'David', AGE: 27, ADDRESS: 'Texas', SALARY: 85000 }
insertRow(new_employee)

get_by_id(5)

const updated_employee = { NAME: 'David', AGE: 27, ADDRESS: 'Alaska', SALARY: 85000 }
updateRow(updated_employee, 5)
get_by_id(5)

deleteRow(5)

get_all()
