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
            data:this.props.data,
            label:this.props.label,
            text:this.props.text,
            name:this.props.name

        }

        //socket.emit('getData', this.state.name);
 
    }

    componentDidMount(){

      // need to emit the name to the socket.io connection

      


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

      

        // grab data that is being emit from the server.js and add to chart
        socket.on('data1',(res) =>{
          
          //console.log(res)
          var num = Array.from({length:1}, () => Math.floor(Math.random()*590)+10)
          this.addData(myChart,num,res)
          //this.updateChartData(myChart,res,0);
        })

    }


    // extend datapoints on chart
    addData(chart,label,data){
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