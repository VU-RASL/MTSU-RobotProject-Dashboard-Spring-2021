import React, { Component } from 'react';
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


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: this.props.location.state.name, // var for name of the participant
            highest_level_played: null,
            title_Text: null, // text that goes into the Title of chart , for the LiveChart Component
            numPoints: null,
            dataForChart: null,
            id: null, // var for the user id in mongodb, needed for LiveChart to check if update matches the user 
            Loading: true,
            run:null, // var for specific run
            level:null, // var for specific level 
            task:null, // var for what type of task ( musical / paint )

        }

    }



    componentDidMount() {


        const myQuery = { // this will send the name of participant backend to gather this users information
            name: this.state.name

        }

        // gather user information here 
        axios.post('http://localhost:4000/app/username', myQuery)
            .then(res => {

                var run_Data = res.data.data.musical_task_data.level_history_data.level_1.run_1
                var points = run_Data.length // get length of runs array 

                // create new array from the points variable , that will hold all datapoints for the x-axis
                var datapoints = []
                for (var i = 0; i < points; i++) {
                    datapoints.push(i)
                }



                // set the state 
                this.setState({
                    data: res.data.data, // holds all data for the current participant 
                    highest_level_played: res.data.data.musical_task_data.highest_level_played, // highest level played for current user
                    numPoints: datapoints, // numPoints holds the x-axis datapoints for the chart
                    dataForChart: run_Data, // runs holds the actual data to be plotted on LiveChart
                    title_Text: this.state.name + " level 1", // title for the LiveChart
                    id: res.data.data._id
                })

            })
    }



    render() {
        // only show component when data is ready to be passed 
        if (this.state.dataForChart == null) {
            // a loading icon animation will show if the data is null 
            var ComponentLoaded =
                <div class="container">
                    <ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />

                </div>
        } else {
            // this will show entire component once the loading is complete 
            // place components you want to show on page here
            var ComponentLoaded =
                <div id="navbar">

                    <Navbar />
                    <div class="container">

                        <div style={{ float: 'right' }}>

                            <Link to="/"> <button type='button' className='btn btn-primary'>Return to Home Dashboard</button></Link>

                        </div>

                        <div class = "body" style = {{paddingTop:"70px"}}>

                        <h5 className="display-3">This is {this.state.data.name}'s profile page!</h5>
                        <h2>{this.state.highest_level_played}</h2>
                        <LiveChart data={this.state.dataForChart} label={this.state.numPoints} text={this.state.title_Text} name={this.state.name} id={this.state.id} />
                        </div>
                    </div>

                </div>
        }

        return (

            <div>
                {/* Place components in this page within the "else" conditional statement above */}
                {ComponentLoaded}

            </div>


        )
    }


}
export default Profile;