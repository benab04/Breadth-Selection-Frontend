import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the server
      const response = await fetch("http://your-server-url/api/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      {data ? <div>{Object.keys(data)}</div> : <div>Loading...</div>}
      <button
        onClick={fetchData}
        style={{ height: "20px", width: "40px" }}
      ></button>
    </div>
  );
}

export default App;
