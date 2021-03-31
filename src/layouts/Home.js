// this is code for the home page (dashboard)
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'
import Search from '../components/Search'
import Test from '../components1/Test'



class Home extends Component{
    
    
  


    render(){
      

        return(
        


            <div className="Home" style={{overflow:'hidden'}}>
                

<div style={{float:'right'}}>
            <Search/>
            </div>
            
            
            
           
               
            {/* place Bchart and Rankchart in the view*/ }

            <Test/>



            
            <Agechart/>
            
            
            
            <HighestLvlChart/>
           
            
            
            
           
            
            </div>
             
           
        )
    }


}
export default Home;