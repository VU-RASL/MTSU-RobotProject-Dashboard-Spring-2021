// this the schema for the Users table in database
const mongoose = require('mongoose')

const Users = new mongoose.Schema({

    username:{

        type:String,
        required:true,
        unique:true // username has to be unique for db
    },
    password:{
        type:String,
        required:true

    },
    date:{

        type:Date,
        default:Date.now

    }

})


module.exports = mongoose.model('users',Users)