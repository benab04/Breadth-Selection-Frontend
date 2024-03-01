import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <div id="loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
