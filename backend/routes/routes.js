const express = require('express')
const router = express.Router()
const User = require('../models/Users.js') // import the user model from mongodb
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vanderbilt_dashboard";


// Routes

// signup page
router.post('/signup', async (request,response) =>{

    const saltPassword = await bcrypt.genSalt(10) // generate salt for password
    const securePassword = await bcrypt.hash(request.body.password, saltPassword) // hash the password

    const user = new User({

        username:request.body.username,
        password:securePassword
    })
    user.save() // save this user to db
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{ 
        response.json(error)
    })

})




// login page 
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password error' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', user: user.username , token: token })
	}
    // else

	res.json({ status: '400', error: 'Invalid username/password' })
})




// grab all items from the database and send in response
router.get('/data',  (req, res) => {
	
	MongoClient.connect(url , (err, client) => {
    	if(err) throw err;

    	let database = client.db('vanderbilt_dashboard');

    	database.collection('participants').find()
    	.toArray((err, results) => {
        	if(err) throw err;
			
	   	res.jsonp(results);
	
    	})
	})
})

module.exports = router