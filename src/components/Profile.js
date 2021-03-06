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
import person_icon from '../images/icons/icons-person.png'
import paint_icon from '../images/icons/icons-paint_palette.png'
import music_icon from '../images/icons/icons-music_notes.png'



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


        // check if user has token before showing data, if no token redirect to login page
        var redirect
        if (localStorage.getItem("token")) {

            redirect = false
        } else {

            redirect = true
        }




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
            shouldRedirect: redirect

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
                var cardData = [];
                for (var key in data) {
                    // collecting all task labels
                    if (key !== "_id" && key !== "name" && key !== "age") {
                        taskList.push({
                            label: key,
                            value: key
                        });
                        // add the individual tasks data dynamically, so later if any other task is added it pops up directly
                        cardData.push({
                            task: key,
                            title: this.getCardTitle(key),
                            taskIcon: this.getTaskIcon(key),
                            highestLevel: data[key].highest_level_played,
                            levelScores: data[key].highest_scores_per_level,
                            rankInTask: this.getRankForTask(data['_id'], key),
                            conditionalText: Object.keys(data[key].highest_scores_per_level).length > 1 ?
                                <p style={{ color: "green" }}>Scroll down within list to see other content</p> : ''
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
                    cardData: cardData

                })

            })
    }

    getCardTitle(key) {
        // Add new title if new task is introduced
        if (key === 'musical_task_data') {
            return 'Music Task Stats';
        } else if (key === 'paint_task_data') {
            return 'Paint Task Stats';
        } else {
            return key;
        }
    }

    getTaskIcon(key) {
        // Add new icon for task if new task is introduced
        if (key === 'musical_task_data') {
            return music_icon;
        } else if (key === 'paint_task_data') {
            return paint_icon;
        } else {
            return null;
        }
    }

    getRankForTask(id, task) {
        // returns the rank of a participant for a particular task
        var rankVariable = task + '_rank';
        var participants = JSON.parse(sessionStorage.getItem('participants'));

        var participantData = participants.find(obj => {
            return obj._id === id;
        });

        if (participantData != null) {
            return participantData[rankVariable];
        } else {
            return 0;
        }
    }

    // handled proper state update with async await, not an ideal way but need to figure a better a better solution

    async handleTaskChange(e) {
        // after task selection, enable levels dropdown with approriate values
        const newState = { ...this.state };
        const task = e.value;
        const levels = this.state.data[task].level_history_data
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


        await this.setState(Object.assign({ ...newState }));
    }

    async handleLevelChange(e) {
        // after level selection, enable runs dropdown with approriate values
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


        await this.setState(Object.assign({ ...newState }));
    }

    async handleRunChange(e) {
        // once all the task, level and run selection is done, we display the live chart with the appropriate data
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
    }


    render() {
        // only show component when data is ready to be passed
        var ComponentLoaded = null
        if (this.state.dataForChart == null) {
            // a loading icon animation will show if the data is null 
            ComponentLoaded =
                <div className="container">
                    <ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />

                </div>
        } else {
            // this will show entire component once the loading is complete 
            // place components you want to show on page here
            var liveChart = this.state.renderLiveChart ?
                <LiveChart data={this.state.dataForChart} label={this.state.numPoints} text={this.state.title_Text} name={this.state.name} id={this.state.id} run={this.state.run} task={this.state.task} level={this.state.level} />
                : <br />

            ComponentLoaded =
                <div id="navbar">

                    <Navbar />
                    <div className="container">

                        <div className='float-right'>

                            <Link to="/"> <button type='button' className='btn btn-primary'>Return to Home Dashboard</button></Link>

                        </div>

                        <div className="body" className='profile-body-padding'>

                            {/* Brooke and stuart cards start */}


                            <div className="row">
                                <div className="col-xl-6 col-lg-7 col-md-12">
                                    <div className="card-profile">
                                        <div className="body">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="float-md-right"> <img src={person_icon} width="60" height="60" alt="" /> </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <h4><strong>  {this.state.data.name} </strong></h4>
                                                    <span className="details">Age: {this.state.data.age} </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                {
                                    // return levels and highest score in list, scroll enabled
                                    // Cards are rendered dynamically from cardData variable
                                    Object.entries(this.state.cardData).map(function ([index, task]) {

                                        return <div className="col col-md-6">
                                            <div className="card-task" >
                                                <h1 style={{ borderBottom: "4px solid black" }}>{task.title} <img src={task.taskIcon} width="50" height="50" alt="" /> </h1>
                                                <div className="row_2">
                                                    <div className="column">
                                                        <h4>Levels Completed: </h4>
                                                        <p style={{ fontStyle: "italic" }}>Highest scores per level included</p>
                                                        {task.conditionalText}

                                                        <ul style={{ overflow: "hidden", overflowY: "scroll", height: "50px" }}>
                                                            {
                                                                // return levels and highest score in list, scroll enabled
                                                                Object.entries(task.levelScores).map(function ([level, score]) {

                                                                    return <li> {level} : {score} </li>
                                                                })
                                                            }


                                                        </ul>

                                                    </div>
                                                    <div className='display-type-flex'>
                                                        <h5>Rank : {task.rankInTask}</h5>
                                                    </div>
                                                    <div className='display-type-flex'>
                                                        <h5>Highest Level Achieved: {task.highestLevel}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                {/*{cardData}*/}
                            </div>
                            {/* Task details cards end */}

                            <br />
                            <div className='display-flex'>
                                <div className='select-style'>
                                    {/* Dropdown to select task */}
                                    <div>Select Task: </div>
                                    <Select
                                        options={this.state.tasksData}
                                        isDisabled={this.state.disableTaskDropdown}
                                        value={this.state.selectedTask}
                                        onChange={this.handleTaskChange.bind(this)}

                                    />
                                </div>
                                <div className='select-style'>
                                    {/* Dropdown to select level for the selected task */}
                                    <div>Select Level: </div>
                                    <Select
                                        options={this.state.levelData}
                                        isDisabled={this.state.disableLevelDropdown}
                                        value={this.state.selectedLevel}
                                        onChange={this.handleLevelChange.bind(this)}
                                    />


                                </div>
                                <div className='select-style'>
                                    {/* Dropdown to select run for selected level of a task */}
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

            <div style={{ paddingBottom: "50px" }}>
                {/* Place components in this page within the "else" conditional statement above */}

                {/* if token is not set in local storage redirect the user to login page */}
                {this.state.shouldRedirect ? (window.location = "/login") : null}

                {ComponentLoaded}

            </div>


        )
    }


}
export default Profile;