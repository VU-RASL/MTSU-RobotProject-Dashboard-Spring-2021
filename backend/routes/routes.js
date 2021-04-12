const express = require('express')
const router = express.Router()
const User = require('../models/Users.js') // import the user model from mongodb to be used with mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vanderbilt_dashboard";

// will need to move this to env variable in future
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'




// mongoose connect needed for login/register pages
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})


// verify user token from login
const verifyJWT = (req,res,next) =>{
	const token = req.headers["x-access-token"];
	
	// if no token is detected 
	 if(!token){
		 res.send("No token detected")
	 }else{
	
		jwt.verify(token,JWT_SECRET,(err,decoded)=>{
			if(err){
				res.json({auth:false, message:"U failed to auth"})
			}else{

				req.userId = decoded.id;
				next();
				res.send({auth:true}) 
			}
		})
	 }
	
	}

// Routes

// signup page
router.post('/signup', async (request,response) =>{

    const saltPassword = await bcrypt.genSalt(10) // generate salt for password

    
	if (request.body.password!== ""){
		const securePassword = await bcrypt.hash(request.body.password, saltPassword) // hash the password
		const user = new User({

			username:request.body.username,
			password:securePassword
		})
		user.save() // save this user to db
		.then(data =>{
			response.json({ message: "Register is Success" })
		})
		.catch(error =>{ 
			response.json({ message: error})
		})
	
	
	
	}
	else{
		
		return response.json({ message: "Register is Not Success" })
	}
	

   

})




// login page 
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ auth:false, message: 'User does not Exist' })
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
			// send response thst auth is true and also send the token
		return res.json({ auth: "true", token: token })
	}else{

		res.json({ auth:false, message: 'Invalid username/password' })

	}
    

	
})


// check if user is auth, pass in verifyJWt middleware
router.get('/isUserAuth', verifyJWT,(req, res) => {

	res.send("You are authenticated")
})




// grab all items from the database and send in response
router.get('/data',  (req, res) => {
	
	MongoClient.connect(url , (err, client) => {
    	if(err) throw err;

    	let database = client.db('vanderbilt_dashboard');

    	database.collection('participants').find({}).toArray(function(err, results){
        	if(err) throw err;
			
	   		res.jsonp(results);
	
    	})
	})
})





// grab all items from the database and send in response
router.post('/username', async (req, res) => {
	
	await MongoClient.connect(url , (err, client) => {
    	if(err) throw err;

    	let database = client.db('vanderbilt_dashboard');

    	database.collection('participants').findOne({name:req.body.name},(err, results) => {
			
				if (err ) {
					res.json({ status: 'not found '})
					//res.render('public-profile', { messages: { error: ['User not found'] } });
				}
				else
				{
					res.json({data: results})
					//res.render('login', { ...results, username });
				}
				
				//res.render('public-profile', { ...results, username });
			  });
			})
		}
)












module.exports = router