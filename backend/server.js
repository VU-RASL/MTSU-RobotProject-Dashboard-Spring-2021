const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv') // used for env vars 
const routesUrls = require('./routes/routes')


const cors = require('cors')

dotenv.config() // needed for env vars

mongoose.connect(process.env.DATABASE_ACCESS,{
    // removes warning msgs in console 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true

} , () => console.log("Database connected"))

app.use(express.json()) //activate body parser

app.use(cors())

app.use('/app/user', routesUrls)

app.listen(4000, () => console.log("Server is up and running"))


