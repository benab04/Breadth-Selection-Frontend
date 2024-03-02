import React from "react";
import "./Preloader.css";
function Preloader({ isFull }) {
  return (
    <div className={isFull ? "preloader" : "loader"}>
      <div className="center">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      {isFull ? (
        <h2 className="loader-text">
          Free backend plans spin down with inactivity, which delays booting of
          servers by 50 seconds or more
        </h2>
      ) : null}
    </div>
  );
}

export default Preloader;
