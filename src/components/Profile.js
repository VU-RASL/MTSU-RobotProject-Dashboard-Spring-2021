import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import LiveChart from '../components/LiveChart'
import Navbar from '../components/Navbar'


class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: [], 
           name:this.props.location.state.name,
           highest_level_played:null,
           text:null,
           numPoints:null,
           dataForChart:null,
           id:null
            
        }

    }



    componentDidMount() {


        const myQuery = { // this will gather the user/pass to send to backend
            name: this.state.name
           
        }
    
        axios.post('http://localhost:4000/app/username',myQuery)
        .then(res => {

            // this code gets the first run for level 1 of the user, the number of data points in goes
            // in the points var to eventually be passed as the x-axis for the line chart below in lineChart component
            var runs = res.data.data.musical_task_data.level_history_data.level_1.run_1
            var points = runs.length
            var name = this.state.name
           

            var datapoints = []
            for (var i = 0; i < points;i++)
            {
                datapoints.push(i)
            }


            this.setState({data:res.data.data,
                highest_level_played:res.data.data.musical_task_data.highest_level_played,
                numPoints:datapoints,
                dataForChart:runs,
                text: name + " level 1 run 1",
                id:res.data.data._id

            
            })
   
        })
    }



    render(){
        // only show component when data is ready to be passed 
        if(this.state.dataForChart== null){
            var ComponentLoaded = <div>Loading..</div>
        }else{
            
            var ComponentLoaded =  <LiveChart data = {this.state.dataForChart} label={this.state.numPoints} text = {this.state.text} name ={this.state.name} id = {this.state.id}/>
        }
  
        return(
            
            <div id="navbar">
                <Navbar/>

                <div class="container">
            
                    <div style={{float:'right'}}>
            
                    <Link to= "/"> 
                    <button type='button' className='btn btn-primary'>Return to Home Dashboard</button>
                    </Link>
            
                    </div>

                 <h5 className="display-3">This is {this.state.data.name}'s profile page!</h5>

                <h2>{this.state.highest_level_played}</h2>
                {ComponentLoaded}
                 
                </div>
            </div>
             
           
        )
    }


}
export default Profile;