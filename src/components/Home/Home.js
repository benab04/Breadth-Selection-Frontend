import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import Preloader from "../Preloader/Preloader";

function Home() {
  const homeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const response = await fetch(process.env.REACT_APP_BASE_URL);
        if (response.ok) {
          const data = await response.json();

          if (data && Object.keys(data).length > 0) {
            setIsLoading(false); // Set loading state to false
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 

  }, []); 

  return (
    <section ref={homeRef} className="hero-section">
      {isLoading ? ( 
        <Preloader isFull={true}/>
      ) : (
        <div className="hero">
          <h1 className="welcome">Choose your ideal breadth course for this semester</h1>
          <div className="overlay"></div> {/* Overlay layer */}
          <div className="my-3 buffer-div" ></div>
        </div>
      )}
    </section>
  );
}

export default Home;
