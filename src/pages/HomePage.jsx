import React, { useState } from "react";
import Home from "../components/Home/Home";
import SliderComponent from "../components/Slider/Slider";
import "./pageStyles/HomePage.css";
function HomePage() {
  const [serverData, setServerDataFromInput] = useState();
  const [selectedCheckboxes, setCheckedBoxesFromInput] = useState([]);
  return (
    <div className="home-page">
      <Home />
      <SliderComponent />
    </div>
  );
}

export default HomePage;
