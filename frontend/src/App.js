import "./App.css";
import React, { useState, useEffect } from "react";
import DataStreamGraph from "./DataStreamGraph";

function App() {
  const [dataStream, setDataStream] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  // Using useEffect for single rendering
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data");
        const data = await res.json();
        console.log(data);
        setDataStream(data.data_stream);
        setAnomalies(data.anomalies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <DataStreamGraph datastream={dataStream} anomaly={anomalies} />
    </div>
  );
}

export default App;
