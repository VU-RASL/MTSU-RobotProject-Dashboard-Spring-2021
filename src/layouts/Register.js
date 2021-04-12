import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import "./css/login.css"
import pic from '../images/vandy3.jpeg'
import logo from '../images/vandy_logo2.png'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            message:null,
            redirect:false
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
        const registered = { // this will gather the user/pass to send to backend
            username: this.state.username,
            password: this.state.password
        }

        // below the axios will connect with our backend 
        axios.post('http://localhost:4000/app/signup', registered)
        .then(response => {
            
            if (response.data.message === "Register is Success"){
                this.setState({message:response.data.message,redirect:true})    

            }
            else{
                this.setState({message:response.data.message})    
            }
            




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
        
            <div style={{backgroundColor:"#d0d0ce"}}> 
                   <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div class="container">
                <div class="card login-card">
                    <div class="row no-gutters">
                        <div class="col-md-5"> 
                        <img src={pic} alt="login" class="login-card-img"/>
                            
                        </div>
                    
                        <div class="col-md-7">
                            <div class="card-body">
                                <div class="brand-wrapper">
                                <img src={logo} alt="logo" class="logo"/>
                                </div>
                                <p class="login-card-description">Register</p>

                                { this.state.message? <p style={{color:'red'}}>{this.state.message}</p> : null }
                               
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <label for="email" class="sr-only">Username</label>
                                        <input type="text" name="username" onChange={this.changeUsername} value={this.state.username} id="username" class="form-control" placeholder="Username"/>
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password" class="sr-only">Password</label>
                                        <input type="password" name="password" onChange={this.changePassword} value={this.state.password} id="password" class="form-control" placeholder="password"/>
                                    </div>
                                    <input name="login" id="login" class="btn btn-block login-btn mb-4" type="submit" value="Login"/>
                                </form>
                               
                                

                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </main>

                { this.state.redirect ? (window.location="/login") : null }

            </div>
            
        );
        
        
        
        
    }

}

export default Register;