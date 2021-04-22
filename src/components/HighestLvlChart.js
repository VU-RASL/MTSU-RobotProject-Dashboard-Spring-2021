// bar chart for names and highest level reached
import { Component } from 'react';
import { Bar } from 'react-chartjs-2'
//import * as pluginAnnotation from 'chartjs-plugin-annotation'
import axios from 'axios'

class HighestLvlChart extends Component {
    constructor() {
        super();
        this.state = {
            chartData: null
        }
    }

    componentDidMount() {

        this.getChartData();
    }


    getChartData() {
        let names = [];
        let rank = [];
        axios.get('http://localhost:4000/app/data').then(res => {

            for (const dataObj of res.data) {
                names.push(dataObj.name)
                rank.push((parseInt(dataObj.musical_task_data.highest_level_played))

                )
            }
            var mychartData = {

                labels: names,

                datasets: [
                    {
                        label: "highest level reached",

                        data: rank,

                        backgroundColor: [
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

                        ]
                    }]

            }

            this.setState({ chartData: mychartData })
        }).catch(err => {

        })
    }

    render() {
        return (

            <div className="chart">

                <Bar
                    data={this.state.chartData}

                    options={{
                        responsive: true,
                        maintainAspectRatio: true,

                        title: {
                            display: true,
                            text: "Highest level reached ",
                            fontSize: 30
                        },

                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: "#000080"
                            }

                        },
                        scales: {
                            yAxes: [{

                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        plugins: {
                            // still need to figure out how to add plugins for the chart
                            // pluginAnnotation would go here 
                        }

                    }}

                />

            </div>


        )
    }



}

export default HighestLvlChart;