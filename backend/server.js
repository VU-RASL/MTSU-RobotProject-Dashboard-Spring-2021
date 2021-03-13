const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routesUrls = require('./routes/routes')

const cors = require('cors')



mongoose.connect("mongodb://localhost:27017/vanderbilt_dashboard",{
    // removes warning msgs in console 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true

} , () => console.log("Database connected"))

app.use(express.json()) //activate body parser

app.use(cors())

app.use('/app/', routesUrls)

app.listen(4000, () => console.log("Server is up and running"))


