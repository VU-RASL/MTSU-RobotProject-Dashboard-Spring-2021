import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
  
    }
    
    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }

     
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault() // prevents page from refresh.. prevents the default behavior of form
        const loginUser = { // this will gather the user/pass to send to backend
            username: this.state.username,
            password: this.state.password
        }

        // below the axios will connect with our backend 
        axios.post('http://localhost:4000/app/user/login', loginUser)
        .then(response => {
            console.log(response.data)

        
        })

        // below you can redirect the user to another page after success
         //window.location = '/'
       
          this.setState({
            username:'',
            password: ''
        })
        
    }

    render() {
        return ( 
        
            <div> 
                <h2>Login Page</h2>
                <div className='container'>
                    <div className ='form-div'>

                        <form onSubmit={this.onSubmit}>
                            <input type = 'text'
                            placeholder = 'Username'
                            onChange={this.changeUsername}
                            value={this.state.username}
                            className='form-control form-group'
                            />

                            <input type='password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />

                            <input type='submit' className='btn btn-danger btn-black'
                            value='Submit'
                            />
                        </form>
                    </div>
                </div>
            </div>
            
        );
        
        
        
        
    }

}

export default Login;