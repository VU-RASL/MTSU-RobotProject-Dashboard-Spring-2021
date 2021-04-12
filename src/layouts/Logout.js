import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class Logout extends Component{

    state = {
        navigate:false
    }


    logout = () =>{
        localStorage.clear("token")
        this.setState({navigate:true})
    }

    render(){
        const {navigate} = this.state;
        if(navigate){
            return <Redirect to ='/login' push={true}/>
        }

        return <button type="button" class = "btn btn-danger" onClick={this.logout}>Log out</button>
    }


}

export default Logout;