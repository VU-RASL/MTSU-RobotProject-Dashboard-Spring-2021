// this is code for the home page (dashboard)
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link } from 'react-router-dom';


class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: [], // this where i set props ,
           name:this.props.location.state.name,
           highest_level_played:null
            
        }

    }



    componentDidMount() {

        
       
        

        const myQuery = { // this will gather the user/pass to send to backend
            name: this.state.name
           
        }
    
        axios.post('http://localhost:4000/app/username',myQuery)
        .then(res => {

            this.setState({data:res.data.data,
                highest_level_played:res.data.data.musical_task_data.highest_level_played})
            
                console.log(this.state.data)
           

        })
    }



    render(){
        return(
        

            <div className="profile">
            
            <div style={{float:'right'}}>
            
            <Link to= "/"> 
            <button type='button' className='btn btn-primary'>Return to Home Dashboard</button>
           </Link>
            
            </div>


            <h1 className="display-3">This is profile page!</h1>

            <h2>{this.state.data.name}</h2>
            <h2>{this.state.highest_level_played}</h2>
            
            
            

            </div>
             
           
        )
    }


}
export default Profile;