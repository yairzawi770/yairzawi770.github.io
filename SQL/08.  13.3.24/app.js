const express = require('express')
const body_parser = require('body-parser')
const path = require('path')
const cors = require('cors')
const config = require('config')
const logger = require('./logger/my_logger')
const employees_router = require('./routers/employees_router')
const app = express() // creates my server

app.use(cors())

app.use(body_parser.json()) // will help to get the body of the request 

app.use(express.static(path.join('.', '/static/'))) // allows browsing to my static folder

// start
app.listen(config.server.port, () => {
    logger.info(`==== express server is up on port ${config.server.port}`);
})

app.use('/api/employees', employees_router)
