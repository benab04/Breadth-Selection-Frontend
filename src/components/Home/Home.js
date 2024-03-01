import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import "./Home.css";
function Home() {
  const homeRef = useRef(null);

  return (
    <section ref={homeRef} className="hero-section">
      
      <div className="hero">
        <h1 className="welcome">Choose a suitable breadth for this semester</h1>
      </div>
    </section>
  );
}

export default Home;
