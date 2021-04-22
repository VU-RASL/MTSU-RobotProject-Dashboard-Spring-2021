import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import Participants from '../components/Participants'
import Navbar from '../components/Navbar'
import crowd_icon from '../images/icons/icons-crowd.png'
import age_icon from '../images/icons/icons-age-calender.png'
import axios from 'axios'

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



class Home extends Component {
  constructor() {
    super()
    
    // check if user has token before showing data, if no token redirect to login page
    var redirect
    if (localStorage.getItem("token") ){

        redirect = false
    }else{

      redirect = true
    }
    
    
    this.state = {
      total_participants: null,
      avg_age: null,
      loading: true,
      shouldRedirect:redirect
    }


  }

  componentDidMount() {

    axios.get('http://localhost:4000/app/data')
      .then(response => {
        this.setState({ data: response.data })

        // get list of ages and names
        var names = []
        var ages = []
        for (const dataObj of response.data) {
          names.push(dataObj.name)
          ages.push(dataObj.age)
        }


        // get avg age 
        var total = 0
        for (var i = 0; i < ages.length; i++) {

          total += ages[i];
        }
        var avg = Math.round(total / ages.length)


        // set states
        this.setState({ total_participants: names.length, avg_age: avg, loading: false })

      })

  }




  render() {
    var ComponentLoaded = null
    if (this.state.loading === true) {
      // a loading icon animation will show if the data is null 
      ComponentLoaded =
        <div className="container">
          <ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />

        </div>
    }
    else {

      ComponentLoaded =
        <div id="navbar">

          <Navbar />

          <div className="container" >


            {/* Row of cards start */}
            <div className="row d-flex justify-content-center" style={{ paddingTop: "30px" }}>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="align-self-center">
                          <img src={crowd_icon} width="60" height="60" alt="" />
                        </div>
                        <div className="media-body text-right">
                          <h3>{this.state.total_participants}</h3>
                          <span>Number of Participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="align-self-center">
                          <img src={age_icon} width="60" height="60" alt="" />
                        </div>
                        <div className="media-body text-right">
                          <h3>{this.state.avg_age}</h3>
                          <span>Average Age of Particpants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Row of cards end */}


            <div className="body" style={{ paddingTop: "70px" }}>

              <Participants />


              <Agechart />


              <HighestLvlChart />




            </div>
          </div>
        </div>


    }

    return (

      <div>

        {/* if token is not set in local storage redirect the user to login page */}
        {this.state.shouldRedirect? (window.location = "/login"): null}
        {ComponentLoaded}
      </div>

    )
  }


}
export default Home;