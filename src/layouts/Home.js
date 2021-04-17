import {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import ParticipantTest from '../components1/ParticipantsTest'
import Navbar from '../components/Navbar'
import crowd_icon from '../images/icons/icons-crowd.png'
import age_icon from '../images/icons/icons-age-calender.png'
import chart_fall_icon from '../images/icons/icons-chart-decreasing.png'
import chart_rise_icon from '../images/icons/icons-chart-increasing.png'





class Home extends Component{
    constructor(){
        super()

        var shouldRedirect;
        // check the local storage to see if token exists
        if (localStorage.getItem("token")!= null){
            shouldRedirect = false
        }
        else{
            shouldRedirect = true
        }


        this.state = {
            redirect:shouldRedirect
        }


    }
   
    render(){
      

        return(

            
        <div id="navbar">
           
            <Navbar/>
                
            <div class = "container" >


        {/* Row of cards start */}
     <div class="row" style = {{paddingTop:"30px"}}>
      <div class="col-xl-3 col-sm-6 col-12"> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                <img src={crowd_icon} width="60" height="60" alt=""/>
                </div>
                <div class="media-body text-right">
                  <h3>278</h3>
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
                <img src={chart_rise_icon} width="60" height="60" alt=""/>
                </div>
                <div class="media-body text-right">
                  <h3>278</h3>
                  <span>Highest Performing Level</span>
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
                <img src={chart_fall_icon} width="60" height="60" alt=""/>
                </div>
                <div class="media-body text-right">
                  <h3>278</h3>
                  <span>Lowest Performing Level</span>
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
                <img src={age_icon} width="60" height="60" alt=""/>
                </div>
                <div class="media-body text-right">
                  <h3>78</h3>
                  <span>Average Age of Particpants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

             {/* Row of cards end */}


            <div class = "body" style = {{paddingTop:"70px"}}>
               
            <ParticipantTest/>
 
            
            <Agechart/>
            

            <HighestLvlChart/>
            

            {/* if token is not set in local storage redirect the user to login page */}
            { this.state.redirect ? (window.location="/login") : null }
           
            </div>
            </div>
        
        
        
        
        
        
        </div>
        )
    }


}
export default Home;