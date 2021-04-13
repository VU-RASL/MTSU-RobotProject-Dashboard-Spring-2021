// this is code for the home page (dashboard)
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import Search from '../components/Search'
import ParticipantTest from '../components1/ParticipantsTest'
import Navbar from '../components/Navbar'




class Home extends Component{
    constructor(){
        super()

        var go;
        if (localStorage.getItem("token")!= null){
            go = false
        }
        else{
            go = true
        }


        this.state = {
            redirect:go
        }


    }
   

    


    
    
    render(){
      

        return(

            
        <div id="navbar">
           
            <Navbar/>
                
            <div class = "container" style={{overflow:'hidden'}}>    
               
            <ParticipantTest/>

            <Agechart/>
        
            <HighestLvlChart/>
            
            { this.state.redirect ? (window.location="/login") : null }
           
            </div>
        
        </div>
        )
    }


}
export default Home;