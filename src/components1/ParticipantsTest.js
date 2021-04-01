import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";



function ParticipantTest() {
  // here you set a state to tell the component it need to wait
  //  until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);




  const [mydata, setData] = useState();
  const[mycols,setCols] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:4000/app/data")
        .then((response) => {
          // check if the data is populated
          console.log(response.data[0].musical_task_data.highest_scores_per_level);

          // performing a null check
          // if (response.data && response.data.length > 0) {
            var participants = response.data;
            var segment = response.data[0];
            var taskList = [];
            for (var key in segment) {
                console.log("Key: " + key);
                console.log("Value: " + segment[key]);
                if (key !== "_id" && key!=="name" && key!=="age") {
                    taskList.push(key);
                }
            }

            participants.map((participant) => {
                for (var task in taskList) {
                    var taskName = taskList[task];
                    var hLevelLabel = taskName + "_hLevel";
                    var hScoreLabel = taskName + "_hScoreOfLevel";
                    var hLevel = participant[taskName].highest_level_played;
                    var levelLabel = 'level_' + hLevel;
                    var hScoreOfLevel = participant[taskName].highest_scores_per_level[levelLabel];
                    participant[hLevelLabel] = hLevel;
                    participant[hScoreLabel] = hScoreOfLevel;
                }
            });
            console.log("Participants list before ranking : " + participants);
            for (var task in taskList) {
                var taskName = taskList[task];
                var hLevelLabel = taskName + "_hLevel";
                var hScoreLabel = taskName + "_hScoreOfLevel";
                var taskRankLabel = taskName + "_rank";
                participants.sort(function(a, b) {
                    return b[hLevelLabel] - a[hLevelLabel]  ||  b[hScoreLabel] - a[hScoreLabel];
                });
                let rank = 0;
                participants.map((participant) => {
                    participant[taskRankLabel] = ++rank;
                });
            }
            console.log("Participants list after ranking : " + participants);
          // }

          var myCols = [
              {
                  Header: 'Name',
                  accessor: 'name'
              }
          ]
          for (var task in taskList) {
            var taskName = taskList[task];
            var taskRankLabel = taskName + "_rank";
            myCols.push( {
                Header: taskRankLabel,
                accessor: taskRankLabel
            })
          }
          
          // trim down headers removing any undefined data
          myCols = myCols.filter(function(element){
            return element !== undefined;
          })

          var myData = participants
          
          //delete age and id property from the the response data
        //   for(var i = 0; i < myData.length; i++){
        //     delete myData[i].age
        //     delete myData[i]._id
        //     delete myData[i].musical_task_data.level_history_data
        //     delete myData[i].paint_task_data.level_history_data
        //   }
         

          // set the Data and Cols States
          setCols(myCols)
          setData(myData);
          // you tell it that you had the result
          setLoadingData(false);
        });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  return (
    <div className="Test">
      {/* here you check if the state is loading otherwise if you will not call that you will get a blank page because the data is an empty array at the moment of mounting */}
      {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <div>
         
         <Table data={mydata} columns={mycols}/>
        </div>
      )}
    </div>
  );
}

export default ParticipantTest;