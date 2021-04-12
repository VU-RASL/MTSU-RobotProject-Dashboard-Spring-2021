const express = require('express')
const app = express()
const routesUrls = require('./routes/routes')
const socket = require('socket.io') // import socket.io
const MongoClient = require('mongodb').MongoClient;

const cors = require('cors')


app.use(express.json()) //activate body parser

app.use(cors())

app.use('/app/', routesUrls)




const server = app.listen(4000, () => console.log("Server is up and running"))



// setup listener for socket.io , will listen for changes on localhost/4000
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

  // connect to mongo replicaset
  const url = 'mongodb://localhost:27017/?replicaSet=rs1';

        MongoClient.connect(url, function(err, client) {


            if(err){
                throw err;
            }


            console.log("connected to new Mongo")
            // connect to database
            const db = client.db('vanderbilt_dashboard');

       


    // when socket is connected will run function below
    io.sockets.on('connection',(socket) =>{
        console.log('socket io connected');
        
            // watch for changes on the participants collection
            db.collection('participants').watch().on('change', (change) => {
                
                switch (change.operationType) {
                    case "update":

             // the response if you console.log(change) looks like this....
      /*
        {
  _id: {
    _data: '82606E29C9000000012B022C0100296E5A10043BCBE2C5EDFF4610BC92829C7E04052946645F696400646055E92EB18BA1D7429DC93B0004'
  },
  operationType: 'update',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1617832393 },
  ns: { db: 'vanderbilt_dashboard', coll: 'participants' },
  documentKey: { _id: 6055e92eb18ba1d7429dc93b },
  updateDescription: {
    updatedFields: { 'musical_task_data.level_history_data.level_1.run_1.168': 0.11 },
    removedFields: []
  }
}
      */                
                        // get the id of the user where change happens
                        var id_check = change.documentKey._id
                        // grab the field that changed
                        var updated_fields= change.updateDescription.updatedFields
                        
                        
                        const DataSend = {
                            id: id_check,
                            data:updated_fields


                        }
                        // send this info back to the client(LiveChart.js)
                        socket.emit('data1', DataSend);

                }
                
            });
        
        // below is a function that will demo random data sent to client
        sendData(socket);
    })
    
    
    });





// function sends random number to lineChart
function sendData(socket){


    socket.emit('data1', (Math.floor(Math.random()*10) + 1) /10);
    
    
    setTimeout(() =>{
        sendData(socket);
    },5000) // send data every 5 seconds
}












