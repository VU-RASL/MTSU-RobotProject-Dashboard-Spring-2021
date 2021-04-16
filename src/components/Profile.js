import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import LiveChart from '../components/LiveChart'
import Navbar from '../components/Navbar'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
import '../components/style.scss';



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
            run: null, // var for specific run
            level: null, // var for specific level 
            task: null, // var for what type of task ( musical / paint )
            renderLiveChart: false,
            
        }

    }



    componentDidMount() {


        const myQuery = { // this will send the name of participant backend to gather this users information
            name: this.state.name

        }

        // gather user information here 
        axios.post('http://localhost:4000/app/username', myQuery)
            .then(res => {

                var data = res.data.data;
                var taskList = [];
                for (var key in data) {
                    // collecting all task labels
                    if (key !== "_id" && key !== "name" && key !== "age") {
                        taskList.push({
                            label: key,
                            value: key
                        });
                    }
                }


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
                    id: res.data.data._id,
                    tasksData: taskList,
                    disableTaskDropdown: false,
                    selectedTask: '',
                    selectedTaskValue: '',
                    levelData: [],
                    disableLevelDropdown: true,
                    selectedLevel: '',
                    selectedLevelValue: '',
                    runData: [],
                    disableRunDropdown: [],
                    selectedRun: '',
                    selectedRunValue: '',
                    highestScoreOfLevel: ''

                })

            })
    }

    // handled proper state update with async await, not an ideal way but need to figure a better a better solution

    async handleTaskChange(e) {
        const newState = { ...this.state };
        const task = e.value;
        const levels = this.state.data[task].level_history_data
        console.log(levels);
        const levelData = [];
        Object.entries(levels).map(item => {
            levelData.push({
                label: item[0],
                value: item[0]
            })
        })

        newState.task = e.value
        newState.selectedTask = e;
        newState.selectedTaskValue = task;
        newState.levelData = levelData;
        newState.disableLevelDropdown = false;
        newState.runData = [];
        newState.disableRunDropdown = true;
        newState.selectedLevel = '';
        newState.selectedLevelValue = '';
        newState.selectedRun = '';
        newState.selectedRunValue = '';
        newState.renderLiveChart = false;
        newState.highestScoreOfLevel = '';

        document.getElementById('highestScoreOfLevel').innerHTML = '';

        await this.setState(Object.assign({ ...newState }));
        console.log(this.state);
    }

    async handleLevelChange(e) {
        const newState = { ...this.state };
        const level = e.value;
       
        const runs = newState.data[newState.selectedTaskValue].level_history_data[level]
        const runData = [];
        Object.entries(runs).map(item => {
            runData.push({
                label: item[0],
                value: item[0]
            })
        })

        newState.level = e.value
        newState.selectedLevel = e;
        newState.selectedLevelValue = level;
        newState.runData = runData;
        newState.disableRunDropdown = false;
        newState.selectedRun = '';
        newState.selectedRunValue = '';
        newState.renderLiveChart = false;

        const highScore = newState.data[newState.selectedTaskValue].highest_scores_per_level[level];
        document.getElementById('highestScoreOfLevel').innerHTML = '<b>Highest Score of Level: ' + highScore + '</b>';

        await this.setState(Object.assign({ ...newState }));
        console.log(this.state);
    }

    async handleRunChange(e) {
        const newState = { ...this.state };

        newState.selectedRun = e;
        newState.selectedRunValue = e.value;
        newState.renderLiveChart = true;
        newState.dataForChart = newState.data[newState.selectedTaskValue]
            .level_history_data[newState.selectedLevelValue][newState.selectedRunValue];
       
        newState.run = e.value
        
        newState.numPoints = []
        for (var i = 0; i < newState.dataForChart.length; i++) {
            newState.numPoints.push(i)
        }

        newState.title_Text = newState.name + ' - ' + newState.selectedTaskValue + ' - ' + newState.selectedLevelValue
            + ' - ' + newState.selectedRunValue;

        await this.setState(Object.assign({ ...newState }));
        
        console.log(this.state);
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
            var liveChart = this.state.renderLiveChart ?
                <LiveChart data={this.state.dataForChart} label={this.state.numPoints} text={this.state.title_Text} name={this.state.name} id={this.state.id} run = {this.state.run} task = {this.state.task} level={this.state.level}/>
                : <br />
            var ComponentLoaded =
                <div id="navbar">

                    <Navbar />
                    <div class="container">

                        <div className='float-right'>

                            <Link to="/"> <button type='button' className='btn btn-primary'>Return to Home Dashboard</button></Link>

                        </div>

                        <div class="body" className='profile-body-padding'>

                            <h6 className="display-4">This is {this.state.data.name}'s profile page!</h6>
                            <br />
                            <div className='display-flex'>
                                <div className='select-style'>
                                    <div>Select Task: </div>
                                    <Select
                                        options={this.state.tasksData}
                                        isDisabled={this.state.disableTaskDropdown}
                                        value={this.state.selectedTask}
                                        onChange={this.handleTaskChange.bind(this)}
                                        
                                    />
                                </div>
                                <div className='select-style'>
                                    <div>Select Level: </div>
                                    <Select
                                        options={this.state.levelData}
                                        isDisabled={this.state.disableLevelDropdown}
                                        value={this.state.selectedLevel}
                                        onChange={this.handleLevelChange.bind(this)}
                                    />
                                    <br />
                                    <div id='highestScoreOfLevel'></div>
                                </div>
                                <div className='select-style'>
                                    <div>Select Run: </div>
                                    <Select
                                        options={this.state.runData}
                                        isDisabled={this.state.disableRunDropdown}
                                        value={this.state.selectedRun}
                                        onChange={this.handleRunChange.bind(this)}
                                    />
                                </div>


                            </div>

                            <br /><br /><br />
                            {/* Render live chart on conditional basis */}
                            {liveChart}


                        </div>
                    </div>

                </div >
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