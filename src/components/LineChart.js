

import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'
import axios from 'axios'
import 'chartjs-plugin-colorschemes';


class LineChart extends Component{
    constructor(){
        super();
        this.state = {
            chartData:null
                
        }
        
    }

    componentWillMount(){

        this.getChartData();
        
    }


    getChartData(){
        let runs = [];
        let points = null;
        let pn = []
        axios
        .get('http://localhost:4000/app/data')
        .then(res => {
         
            //console.log(res);
            runs = res.data[0].musical_task_data.level_history_data.level_1.run_1
            points = runs.length

            for (var i = 0; i < points;i++)
            {
                pn.push(i)
            }


         
            var mychartData = {  
            
                labels: pn,
                
                datasets:[
                {
                    
                    label:"run",
                    data: runs,
                    fill:false,
                    
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

          
        <Line
            data={this.state.chartData}

            options={{ 
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:true,
                    text: "Mark Trover lvl history - level 1/ run 1",
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
                },
                plugins: {

                    colorschemes: {
              
                      scheme: 'brewer.Paired12'
              
                    }
                }

                
            }}

            />

        </div>


    )
}




}

export default LineChart;