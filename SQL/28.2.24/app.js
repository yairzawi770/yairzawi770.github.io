const knex = require('knex')

const data_base = knex({
    client: 'sqlite3',
    connection: {
        filename: 'our_db.db'
    },
    useNullAsDefault: true
})


async function create_table() {
    await data_base.raw(`CREATE TABLE IF NOT EXISTS COMPANY (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        AGE INT NOT NULL,
        ADDRESS CHAR(50),
        SALARY REAL);`);
}

async function insert_row() {
    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Paul', 32, 'California', 20000.00 );`);

    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Allen', 25, 'Texas', 15000.00 );`);

    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Teddy', 23, 'Norway', 20000.00 );`);

    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Mark', 25, 'Rich-Mond ', 65000.00 );`);

    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('David', 27, 'Texas', 85000.00 );`);

    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Kim', 22, 'South-Hall', 45000.00 );`);
}
// GET GET/ID POST PUT DELETE 

async function get_all() {
    const employees = await data_base.raw("select * from COMPANY")
    console.log(employees);
}

create_table()
insert_row()
get_all()