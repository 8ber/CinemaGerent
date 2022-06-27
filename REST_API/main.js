const express = require('express');
const subscriptionsRouter = require('./routers/subscriptions')
const statsRouter = require('./routers/stats')
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/members')
let app = express()

require('./configs/mongoose')
require('./models/getAllDataBL') // get all INITIAL data!

var cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/api/subscriptions', subscriptionsRouter)
app.use('/api/stats', statsRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)

app.listen(8000)

console.log("Subscriptions API server is running...")