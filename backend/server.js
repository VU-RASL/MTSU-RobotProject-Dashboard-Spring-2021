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





  const url = 'mongodb://localhost:27017/?replicaSet=rs1';

        MongoClient.connect(url, function(err, client) {


            if(err){
                throw err;
            }


            console.log("connected to new Mongo")
            const db = client.db('vanderbilt_dashboard');

       


    // when socket is connected will run function below
    io.sockets.on('connection',(socket) =>{
        console.log('socket io connected');




        
        
            // we need to grab the name to lookup from the live chart
           
        /*
            var filter = [{
                $match : {
                
                $and: [
                    {name : name_lookup },
                    { "updateDescription.updatedFields.musical_task_data": { $exists: true } },
                    { operationType: "update" }]
        
                }
            }]
    */
        
        
            db.collection('participants').watch().on('change', (change) => {
                console.log("something changed");
                
                switch (change.operationType) {
                    case "update":
                        console.log("something updated");
                        
                        
                        var data_to_send = change.updateDescription.updatedFields
                        socket.emit('data1', data_to_send);

                }
                
            });
        
        
        //sendData(socket);
    })
    



    

    
    });


// function sends random number to lineChart
function sendData(socket){


    socket.emit('data1', (Math.floor(Math.random()*10) + 1) /10);
    
    
    setTimeout(() =>{
        sendData(socket);
    },5000) // send data every 5 seconds
}








