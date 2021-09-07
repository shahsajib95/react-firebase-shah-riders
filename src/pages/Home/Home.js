import React from "react";
import Headers from "../../component/Navbar/Navbar";
import Rides from "../../component/Rides/Rides";
import "./Home.css";
const Home = () => {
  return (
    <div className="home">
      <Headers />
      <Rides />
    </div>
  );
};

export default Home;
