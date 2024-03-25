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

async function delete_table() {
    await data_base.raw(`DROP TABLE IF EXISTS students`);
}

async function create_table() {
    data_base.schema.createTableIfNotExists
    await data_base.raw(`CREATE TABLE students (id INTEGER PRIMARY KEY,
         name TEXT, city TEXT, birth INTEGER);
  `);
}

function insert_rows_for_students() {
   `INSERT INTO students VALUES (1, 'SHALOM', 'TEL AVIV', 1974);
    INSERT INTO students VALUES (2, 'YURI', 'RAANANA', 1980);
    INSERT INTO students VALUES (3, 'ANAT', 'RISHON', 1994);
    INSERT INTO students VALUES (4, 'DANA', 'REHOVOT', 1990);
    INSERT INTO students VALUES (5, 'OMER', 'JERUSALEM', 1987);`
        .replaceAll('\n    ', '')
        .split(';')
        .filter(query => query)
        .forEach(async query => { await data_base.raw(query + ';') })
}

///////////////// GET
async function get_all() {
    const student = await data_base.raw("select * from students")
    //const employees = await data_base.select('*').from('COMPANY');
    console.log(student.rows);

    //await data_base.destroy() 
}

///////////////// POST
async function insertRow(new_student) {
    // insert query
    // option 1
    // data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    //                 VALUES ('${new_employee.NAME}', ${new_employee.AGE},'${new_employee.ADDRESS}', ${new_employee.AGE});`)

    // option 2
    await data_base.raw(`INSERT INTO students (id, name, city, birth)
                    VALUES (?, ?, ?, ?);`,
        [new_student.id, new_student.name, new_student.city, new_student.birth])
}

///////////////// PUT-PATCH
async function updateRow(updated_student, id) {
    await data_base.raw(`UPDATE students set id=?,name=?,city=?,birth=? where id=?`,
    [updated_student.id, updated_student.name, updated_student.city, updated_student.birth])
}
///////////////// DELETE
async function deleteRow(id) {
    await data_base.raw(`DELETE FROM students where id=?`, [id])
}
///////////////// GET\id
async function get_by_id(id) {
    const student = await data_base.raw(`select * from students where id = ${id}`)
    console.log(student.rows);
}

let finished = false;
// create_table()
// insert_rows_for_students()
// get_all()
// delete_table()

const new_student = { id: 5, name: 'OMER', city: 'JERUSALEM', birth: 2000 }
insertRow(new_student)

// get_by_id(5)

// const updated_student = { id: 6, name: 'YAIR', city: 'TEL-AVIV', birth: 1999 }
// updateRow(updated_student, 6)
// get_by_id(6)

// deleteRow(6)

