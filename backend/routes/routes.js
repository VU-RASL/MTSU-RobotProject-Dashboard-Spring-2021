const express = require('express')
const router = express.Router()
const User = require('../models/Users.js') // import the user model from mongodb
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv') // used for environment variables



dotenv.config() 

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
			process.env.JWT_SECRET
		)

		return res.json({ status: 'ok', user: user.username , token: token })
		
		
	}
    // else

	res.json({ status: '400', error: 'Invalid username/password' })
})







module.exports = router