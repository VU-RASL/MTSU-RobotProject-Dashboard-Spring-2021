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

        const params =  {
            name:'Mark Trover'

        }
        axios.get('http://localhost:4000/username',{params})
            .then(res => {
                console.log(res.data)
                this.setState({ data: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }




    render(){
        return(
        

            <div className="profile">
            
            <h1 className="display-3">This is profile page!</h1>

            

            </div>
             
           
        )
    }


}
export default Profile;