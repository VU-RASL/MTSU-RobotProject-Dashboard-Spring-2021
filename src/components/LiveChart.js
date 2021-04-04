// Barchart for names and ages

import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'
import 'chartjs-plugin-streaming';
import axios from 'axios'

class LiveChart extends Component{
    constructor(){
        super();
     

        const data = {
            datasets: [
              {
                label: "Dataset 1",
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                lineTension: 0,
                borderDash: [8, 4],
                data: []
              }
            ]
          };

          const options = {
            scales: {
              xAxes: [
                {
                  type: "realtime",
                  realtime: {
                    onRefresh: function() {
                      data.datasets[0].data.push({
                        x: Date.now(),
                        y: Math.random() * 100
                      });
                    },
                    delay: 2000
                  }
                }
              ]
            }
          };


          this.state = {
            mydata:data,
            myoptions:options,
            chartData:null
            
                
        }



        
    }

    componentWillMount(){

        this.getChartData();
        
        
    }


    getChartData(){
        let names = [];
        let ages = [];
        axios
        .get('http://localhost:4000/app/data')
        .then(res => {
         
            //console.log(res);
         for (const dataObj of res.data){
            names.push(dataObj.name)
            ages.push((parseInt(dataObj.age))
            
            )}
            var mychartData = {  
            
                labels: names,
                
                datasets:[
                {
                    label:"Ages of participant",
                    
                    data: ages,
                    
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    '#2E8B57',
                    '#0000FF',
                    '#4B0082',
                    '#FF1493'


                       
                    ],
                    borderWidth:1
                }
            
                ]
            }

            this.setState({chartData:mychartData})
       }).catch(err => {
    
       // console.log(err);
       })
       //console.log(names,ages)
    }

   


render(){
    return (

        <div className="chart">

            <Line data={this.state.mydata} options={this.state.myoptions} />
       

        </div>


    )
}




}

export default LiveChart;