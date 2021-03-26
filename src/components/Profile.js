// this is code for the home page (dashboard)
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'




class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: [] // this where i set props 
            
        }

    }


    componentDidMount() {

        const registered = { // this will gather the user/pass to send to backend
            name: "Mark Trover"
           
        }
    
        axios.post('http://localhost:4000/app/username',registered)
        .then(res => {

            this.setState({data:res.data.data})
           

        })
    }




    render(){
        return(
        

            <div className="profile">
            
            <h1 className="display-3">This is profile page!</h1>

            <h2>{this.state.data.name}</h2>
            

            </div>
             
           
        )
    }


}
export default Profile;