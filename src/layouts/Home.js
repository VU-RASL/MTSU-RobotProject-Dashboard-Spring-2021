import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import Participants from '../components/Participants'
import Navbar from '../components/Navbar'
import crowd_icon from '../images/icons/icons-crowd.png'
import age_icon from '../images/icons/icons-age-calender.png'
import chart_fall_icon from '../images/icons/icons-chart-decreasing.png'
import chart_rise_icon from '../images/icons/icons-chart-increasing.png'
import axios from 'axios'




class Home extends Component {
  constructor() {
    super()

    var shouldRedirect;
    // check the local storage to see if token exists
    if (localStorage.getItem("token") != null) {
      shouldRedirect = false
    }
    else {
      shouldRedirect = true
    }


    this.state = {
      redirect: shouldRedirect,
      total_participants: null,
      avg_age: null
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
        this.setState({ total_participants: names.length, avg_age: avg })

      })

  }


  getNumParticipants() {


    var j = Object.keys(this.state.data.name).map(function (data) {

      return data
    })

  }

  render() {


    return (


      <div id="navbar">

        <Navbar />

        <div class="container" >


          {/* Row of cards start */}
          <div class="row d-flex justify-content-center" style={{ paddingTop: "30px" }}>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <img src={crowd_icon} width="60" height="60" alt="" />
                      </div>
                      <div class="media-body text-right">
                        <h3>{this.state.total_participants}</h3>
                        <span>Number of Participants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <img src={age_icon} width="60" height="60" alt="" />
                      </div>
                      <div class="media-body text-right">
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


          <div class="body" style={{ paddingTop: "70px" }}>

            <Participants />


            <Agechart />


            <HighestLvlChart />


            {/* if token is not set in local storage redirect the user to login page */}
            {this.state.redirect ? (window.location = "/login") : null}

          </div>
        </div>






      </div>
    )
  }


}
export default Home;