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

// connect to mongo replicaset be sure to name the replica set for you database "rs1"
// if you want to change the default name 
// of replica set you can change the name by replacing "rs1" in string below 
const url = 'mongodb://localhost:27017/?replicaSet=rs1';

MongoClient.connect(url, function (err, client) {


  if (err) {
    throw err;
  }

  // connect to database
  const db = client.db('vanderbilt_dashboard');




  // when socket is connected will run function below
  io.sockets.on('connection', (socket) => {


    // example of Mongodb change stream usage :
    // ( https://docs.mongodb.com/drivers/node/usage-examples/changeStream/)

    
    // watch for changes on the participants collection
    db.collection('participants').watch().on('change', (change) => {

      switch (change.operationType) {
        case "update":

     
          // get the id of the user where change happens
          var id_check = change.documentKey._id
          // grab the field that changed
          var updated_fields = change.updateDescription.updatedFields


          const DataSend = {
            id: id_check,
            data: updated_fields


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
function sendData(socket) {


  socket.emit('data1', (Math.floor(Math.random() * 10) + 1) / 10);


  setTimeout(() => {
    sendData(socket);
  }, 5000) // send data every 5 seconds
}












