import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import "./Home.css";

function Home() {
  const homeRef = useRef(null);

  return (
    <section ref={homeRef} className="hero-section">
      <div className="hero">
        <h1 className="welcome">Choose your ideal breadth course for this semester</h1>
        <div className="overlay"></div> {/* Overlay layer */}
        <div className="my-3" style={{width:"10%"}}></div>
      </div>
    </section>
  );
}

export default Home;
