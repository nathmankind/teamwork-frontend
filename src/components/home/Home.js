import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <div className="o-home__display">Welcome to teamwork homepage</div>
      <button
        className="btn btn-primary-button"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </button>
      
    </div>
  );
};

export default Home;
