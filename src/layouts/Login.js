import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import "./css/login.css"
import pic from '../images/vandy2.jpeg'
import logo from '../images/vandy_logo2.png'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            loginStatus: false,
            redirect: false,
            Error_msg: null

        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        // if the user goes to this page and already has a token , set redirect to true
        // so we can push the user back to the dashboard page
        if (localStorage.getItem("token") != null) {
            this.setState({ redirect: true })
        }
    }

    componentWillUnmount() {
        // reset the redirect state back to false
        this.setState({ redirect: false })
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


    userAuth() {
        axios.get('http://localhost:4000/app/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },

        }).then((response) => {
            if (response.data === "You are authenticated") {

                this.setState({ redirect: true })

            }


        })
    }


    onSubmit(event) {
        event.preventDefault() // prevents page from refresh.. prevents the default behavior of form
        const loginUser = { // this will gather the user/pass to send to backend
            username: this.state.username,
            password: this.state.password
        }

        // below the axios will connect with our backend 
        axios.post('http://localhost:4000/app/login', loginUser)
            .then(response => {

                // check if user exist
                if (!response.data.auth) {
                    this.setState({ loginStatus: false, Error_msg: response.data.message })

                } else {
                    this.setState({ loginStatus: true })
                    localStorage.setItem("token", response.data.token)
                    this.userAuth()

                }


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
                                        <p className="login-card-description">Sign into Dashboard App</p>


                                        {this.state.Error_msg ? <p style={{ color: 'red' }}>{this.state.Error_msg}</p> : null}


                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label for="email" className="sr-only">Username</label>
                                                <input type="text" name="username" onChange={this.changeUsername} value={this.state.username} id="username" className="form-control" placeholder="Username" />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label for="password" className="sr-only">Password</label>
                                                <input type="password" name="password" onChange={this.changePassword} value={this.state.password} id="password" className="form-control" placeholder="password" />
                                            </div>
                                            <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Login" />
                                        </form>
                                        <p className="login-card-footer-text">Don't have an account? <a href="/register" className="text-reset">Register here</a></p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>


                { this.state.redirect ? (window.location = "/") : null}


            </div>


        );




    }

}

export default Login;