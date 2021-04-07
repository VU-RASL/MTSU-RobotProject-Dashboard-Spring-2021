const express = require('express')
const app = express()
const routesUrls = require('./routes/routes')
const socket = require('socket.io') // import socket.io
const MongoClient = require('mongodb').MongoClient;

const cors = require('cors')


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







const url = 'mongodb://localhost:27017/?replicaSet=rs1';

MongoClient.connect(url, function(err, client) {
    console.log("connected to new Mongo")

    const db = client.db('vanderbilt_dashboard');
  
    var filter = [{
        $match : {
        
        $and: [

            {name : "Mark Trover" },
            { "updateDescription.updatedFields.musical_task_data.level_history_data.level_1.run_1": { $exists: true } },
            { operationType: "update" }]

        }
    }]
    var options = { fullDocument: 'updateLookup' };
    db.collection('participants').watch(filter,options).on('change', data => {
        console.log(new Date(), data);
    });
   


});

