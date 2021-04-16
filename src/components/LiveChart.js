// Barchart for names and ages

import React, {Component} from 'react';
import Chart from 'chart.js'
import 'chartjs-plugin-streaming';
import io from 'socket.io-client'

const socket = io('http://localhost:4000') // connect to listener


class LiveChart extends Component{
    constructor(props){
        super(props);
     
          this.state = {
            // get props being sent from profile.js
            data:this.props.data,
            label:this.props.label,
            text:this.props.text,
            name:this.props.name,
            id:this.props.id,
            task:this.props.task,
            level:this.props.level,
            run:this.props.run,
            chart:null
           
           

        }
        
       
    }

    componentDidMount(){

     
      // prepare data for chart
      const mydata = {
        labels:this.state.label,
        datasets: [
          {
            fill:false,
            label: "run",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth:1,
            data: this.state.data
          }
        ]
      };

      // create the chart, and insert data that was prepared above
      var ctx = document.getElementById("myChart"); 
      var myChart = new Chart(ctx, {
          type: 'line',
          data: mydata,
          options: { 
              responsive: true, 
              maintainAspectRatio: true,
              title:{
                display:true,
                text:this.state.text,
                fontSize:30

            },
            legend:{
              display: true,
              position:'right',
              labels:{
                  fontColor: "#000080"
              }
              
          
          
          },
          scales:{
            yAxes:[{

                ticks:{
                    beginAtZero:true
                }
            }]
        }
            
          }
      });

      this.setState({chart:myChart})
      
      
    


        // grab data that is being emit from the server.js and add to chart
        socket.on('data1',(res) =>{
          
          // var below creates random x axis point to add to chart 
          var num = Array.from({length:1}, () => Math.floor(Math.random()*590)+10) 

         

        /* uncomment when want to see live updates from mongodb 
        // check if the the current state chart matches the updates coming from mongodb
        var lenOfArray = this.state.label.length 
        var resProp = this.state.task + ".level_history_data." + this.state.level + "." + this.state.run + "." + (lenOfArray)
        var match = res.data.hasOwnProperty(resProp)
        */
        
        
        this.addDataRandom(this.state.chart,num,res) 
        

        /* uncomment when want to see live updates from mongodb 
         if (this.props.id === res.id && match === true){
          this.addData(this.state.chart,num,res)
         }
        
         else{
          // call function that adds random data to chart every 5 seconds 
          this.addDataRandom(this.state.chart,num,res)
         }
          
          //this.updateChartData(myChart,res,0);
      */  
        })
      
    }
  
    // check for updates to props , then set new values to chart
    componentDidUpdate(prevProps){

      if(prevProps.data !== this.props.data){
        this.state.chart.destroy() // destroy old instance of chart before create new one

        const mydata = {
          labels:this.props.label,
          datasets: [
            {
              fill:false,
              label: "run",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth:1,
              data: this.props.data
            }
          ]
        };
  
        // create the chart, and insert data that was prepared above
        var ctx = document.getElementById("myChart"); 
        var myChart = new Chart(ctx, {
            type: 'line',
            data: mydata,
            options: { 
                responsive: true, 
                maintainAspectRatio: true,
                title:{
                  display:true,
                  text:this.props.text,
                  fontSize:30
  
              },
              legend:{
                display: true,
                position:'right',
                labels:{
                    fontColor: "#000080"
                }
                
            
            },
            scales:{
              yAxes:[{
  
                  ticks:{
                      beginAtZero:true
                  }
              }]
          }
              
            }
        });
      
        // replace old states with new props
        this.setState({
          data:this.props.data,
          label:this.props.label,
          text:this.props.text,
          name:this.props.name,
          id:this.props.id,
          task:this.props.task,
          level:this.props.level,
          run:this.props.run,
          chart:myChart
         

        })
      
      
      
      }
    
    
    }

    // might not be needed will examine later..
    componentWillUnmount(){
      this.setState({
        data:null,
          label:null,
          text:null,
          name:null,
          id:null,
          task:null,
          level:null,
          run:null

      })


    }

    
    // add data updates from mongodb
    addData(chart,label,data){

      //console.log(this.state)
      var lenOfArray = this.state.label.length

      // grab the task , level and run from props
      var resProp = this.state.task + ".level_history_data." + this.state.level + "." + this.state.run + "." + (lenOfArray)


      chart.data.labels.push(label);

      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data.data[resProp])
      })
      
      
      chart.update();

      // increment len of array by 1
      lenOfArray+=1
    }

    
    // add random data to chart every 5 seconds from server 
    addDataRandom(chart,label,data){

      var lenOfArray = this.state.label.length
      var resProp = this.state.task + ".level_history_data." + this.state.level + "." + this.state.run + "." + (lenOfArray)
      chart.data.labels.push(label);

      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data)
      })
      
      
      chart.update();
    }
   

    
    updateChartData(chart, data, dataSetIndex){
      chart.data.datasets[dataSetIndex].data = data;
      chart.update()
    }




render(){


    return (

        <div className="chart">

          <canvas id="myChart"></canvas>

        </div>


    )
}




}

export default LiveChart;