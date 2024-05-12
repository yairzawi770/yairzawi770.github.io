const knex = require('knex')
const config = require('config')

const data_base = knex({
    client: 'pg',
    connection: {
        host: config.db_connction.host,
        user: config.db_connction.user,
        password: config.db_connction.password,
        database: config.db_connction.database
    }
})

async function creat_table() {
    try {
        const result = await data_base.raw(``)
        console.log(result); 
}
    catch (e) {
        console.log(e.message);
    }
    finally{

    }
}