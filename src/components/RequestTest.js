// page used to experiment with viewing data from backend
import React, {Component} from 'react';
import axios from 'axios'

class RequestTest extends React.Component {

   state = {

    loading:true,
    data:null
   }
   
   componentDidMount(){
   
    
   axios.get('http://localhost:4000/app/data').then(res => 
   {
    
    // right now you will only see the data of the first record in the mongo db 
    // which is res.data[0].. you can change this by modify the index 
    this.setState({data: res.data[0], loading:false});
      
  }); 
   
   }
   
   render () {
    
    // if the data is successfully fetched from the backend then you will see it appear 
    // on page , if not then the loading test will appear
      if (this.state.loading || !this.state.data){

        return<div>Data not loaded...</div>
      }


     return (
       <div>
         {/* Below you can test out the diff types of data coming from the backend to see */}
           <div> {this.state.data.name} </div>
           <div> {this.state.data.musical_task_data.highest_level_played} </div>

        </div>
       
     )
   } 
 }
   
   
   export default RequestTest;