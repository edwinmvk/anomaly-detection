import "./App.css";
import React, { useState, useEffect } from "react";
import DataStreamGraph from "./DataStreamGraph";

function App() {
  const [dataStream, setDataStream] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    fetch("/data").then((res) =>
      res.json().then((data) => {
        setDataStream(data.data_stream);
        setAnomalies(data.anomalies);
      })
    );
  }, []);

  return (
    <div className="App">
      <DataStreamGraph datastream={dataStream} anomaly={anomalies} />
    </div>
  );
}

export default App;
