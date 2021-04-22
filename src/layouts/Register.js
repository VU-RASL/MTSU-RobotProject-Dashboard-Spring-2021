import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import "./css/login.css"
import pic from '../images/vandy3.jpeg'
import logo from '../images/vandy_logo2.png'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message: null,
            redirect: false
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }


    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault() // prevents page from refresh.. prevents the default behavior of form
        const registered = { // this will gather the user/pass to send to backend
            username: this.state.username,
            password: this.state.password
        }

        // below the axios will connect with our backend 
        axios.post('http://localhost:4000/app/signup', registered)
            .then(response => {

                if (response.data.message === "Register is Success") {
                    this.setState({ message: response.data.message, redirect: true })

                }
                else {
                    this.setState({ message: response.data.message })
                }





            })

        // below you can redirect the user to another page after success
        //window.location = '/'
        this.setState({
            username: '',
            password: ''
        })

    }

    render() {
        return (

            <div style={{ backgroundColor: "#d0d0ce" }}>
                <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                    <div className="container">
                        <div className="card login-card">
                            <div className="row no-gutters">
                                <div className="col-md-5">
                                    <img src={pic} alt="login" className="login-card-img" />

                                </div>

                                <div className="col-md-7">
                                    <div className="card-body">
                                        <div className="brand-wrapper">
                                            <img src={logo} alt="logo" className="logo" />
                                        </div>
                                        <p className="login-card-description">Register</p>

                                        {this.state.message ? <p style={{ color: 'red' }}>{this.state.message}</p> : null}

                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label for="email" className="sr-only">Username</label>
                                                <input type="text" name="username" onChange={this.changeUsername} value={this.state.username} id="username" className="form-control" placeholder="Username" />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label for="password" className="sr-only">Password</label>
                                                <input type="password" name="password" onChange={this.changePassword} value={this.state.password} id="password" className="form-control" placeholder="password" />
                                            </div>
                                            <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Register" />
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                { this.state.redirect ? (window.location = "/login") : null}

            </div>

        );




    }

}

export default Register;