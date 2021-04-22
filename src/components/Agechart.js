// Barchart for names and ages

import { Component } from 'react';
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

class Agechart extends Component {
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
        let ages = [];
        axios
            .get('http://localhost:4000/app/data')
            .then(res => {


                for (const dataObj of res.data) {
                    names.push(dataObj.name)
                    ages.push((parseInt(dataObj.age))

                    )
                }
                var mychartData = {

                    labels: names,

                    datasets: [
                        {
                            label: "Ages of participant",

                            data: ages,

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



                            ],
                            borderWidth: 1
                        }

                    ]
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
                            text: "Age compare",
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
                        }


                    }}

                />

            </div>


        )
    }




}

export default Agechart;