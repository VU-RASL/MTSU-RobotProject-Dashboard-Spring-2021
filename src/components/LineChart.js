

import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'
import 'chartjs-plugin-colorschemes';


class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:null,
            data:this.props.data,
            label:this.props.label,
            text:this.props.text
            
                
        }
       
    }

    componentDidMount(){
       

        this.getChartData();
        
    }


    getChartData(){
       
        var mychartData = {  
            
            labels: this.state.label,
                
            datasets:[
            {
                    
                label:"run",
                data: this.state.data,
                fill:false,
                    
                borderWidth:1
            }
            
            ]
        }
   
    this.setState({chartData:mychartData})
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