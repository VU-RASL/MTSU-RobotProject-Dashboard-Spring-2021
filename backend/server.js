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


const io = socket(server);


io.sockets.on('connection',(socket) =>{
    console.log('socket io connected , new connection id: ${socket.id}');
    sendData(socket);
})

function sendData(socket){

    if(x){
        socket.emit('data1', Array.from({length:8}, () => Math.floor(Math.random()*590)+10));
        x=!x;
    }else{
        socket.emit('data2', Array.from({length:8}, () => Math.floor(Math.random()*590)+10));
        x =!x;
    }


    console.log('data is ${x}');
    setTimeout(() =>{
        sendData(socket);
    },10000)
}

