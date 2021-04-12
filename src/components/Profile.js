import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import LiveChart from '../components/LiveChart'
import Navbar from '../components/Navbar'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// set the css for the load animation 
const override = css`
position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
  border-color: red;
`;


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
           id:null,
           Loading:true
            
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
             // a loading icon animation will show if the data is null 
            var ComponentLoaded = 
            <div class ="container">
                <ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
                
            </div>
        }else{
            // this will show entire component once the loading is complete 
            // place components you want to show on page here
            var ComponentLoaded =   
            <div id="navbar">
           
                <Navbar/>
                <div class="container">
                    
                    <div style={{float:'right'}}>
                    
                     <Link to= "/"> <button type='button' className='btn btn-primary'>Return to Home Dashboard</button></Link>
                
                 </div>

                    <h5 className="display-3">This is {this.state.data.name}'s profile page!</h5>
                    <h2>{this.state.highest_level_played}</h2>
                    <LiveChart data = {this.state.dataForChart} label={this.state.numPoints} text = {this.state.text} name ={this.state.name} id = {this.state.id}/>
               
                </div> 
           
            </div>
        }
  
        return(
            
            <div>
                {/* Place components in this page within the "else" conditional statement above */}
                {ComponentLoaded}
                 
            </div>
             
           
        )
    }


}
export default Profile;