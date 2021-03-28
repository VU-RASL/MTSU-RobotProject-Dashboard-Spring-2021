import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";



function Test() {
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
          //console.log(response.data);

          var myCols= Object.keys(response.data[0]).map((key,id) =>{

            // want everything except _id and age for column headers
            if(key!== "_id" && key!=="age" && key!== "musical_task_data" && key!== "paint_task_data"){

              // this will be the name col
              return {
                Header:key,
                accessor:key

              }

            }
            // musical task col
            if (key ==="musical_task_data") {
              return {

                Header:"Highest_level_Played",
                id:"musical_task_data",
                
                accessor: Object.keys(response.data[0].musical_task_data)
               
              }


            }
            // paint task col
            if (key === "paint_task_data"){
              return{

                Header:"highest level played paint",
                id:"paint_task_data",
                accessor: Object.keys(response.data[0].paint_task_data)
                
            }
          }
        

          })
          
          // trim down headers removing any undefined data
          myCols = myCols.filter(function(element){
            return element !== undefined;
          })

          var myData = response.data
          
          //delete age and id property from the the response data
          for(var i = 0; i < myData.length; i++){
            delete myData[i].age
            delete myData[i]._id
          }

          /*
          // test case was trying to remove the level_history_data and highscores per level data from response
          // to check if errors occured
          for(var i = 0; i < myCols.length; i++){
            delete myCols[i].accessor.level_history_data
            delete myCols[i].accessor.highest_scores_per_level
          }
          */

          
          console.log(myCols) // check column headers in console
          console.log(myData) // check data in console
         

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
        <Table columns = {mycols} data = {mydata} />
      )}
    </div>
  );
}

export default Test;