import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";



function Test() {
  // here you set a state to tell the component it need to wait
  //  until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
        Header: "Music Task Data",
        accessor: "musical_task_data",
      },
      {
        Header: "Paint Task Data",
        accessor: "paint_task_data",
      },
  ]);


  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:4000/app/data")
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          setData(response.data);
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
      {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
      {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
}

export default Test;