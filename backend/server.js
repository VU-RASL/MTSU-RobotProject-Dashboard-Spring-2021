const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routesUrls = require('./routes/routes')
const socket = require('socket.io') // import socket.io

const cors = require('cors')
const { isConstructorDeclaration } = require('typescript')



mongoose.connect("mongodb://localhost:27017/vanderbilt_dashboard",{
    // removes warning msgs in console 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true

} , () => console.log("Database connected"))

app.use(express.json()) //activate body parser

app.use(cors())

app.use('/app/', routesUrls)



// socket .io would go here 

const server = app.listen(4000, () => console.log("Server is up and running"))

// setup listener for socket.io , socket will listen for changes on localhost/4000
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// when socket is connected will run function below
io.sockets.on('connection',(socket) =>{
    console.log('socket io connected');
    sendData(socket);
})

// function sends random number to lineChart
function sendData(socket){

   
    socket.emit('data1', (Math.floor(Math.random()*10) + 1) /10);
    
    
    setTimeout(() =>{
        sendData(socket);
    },5000) // send data every 5 seconds
}

