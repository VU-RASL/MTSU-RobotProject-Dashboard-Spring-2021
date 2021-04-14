import {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import ParticipantTest from '../components1/ParticipantsTest'
import Navbar from '../components/Navbar'




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