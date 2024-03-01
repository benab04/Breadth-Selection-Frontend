import React from "react";
import "./Loader.css";
function Sqaureloader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="square-loader"></div>
      <div style={{ marginTop: "30px" }}>Loading all graphs</div>
    </div>
  );
}

export default Sqaureloader;
