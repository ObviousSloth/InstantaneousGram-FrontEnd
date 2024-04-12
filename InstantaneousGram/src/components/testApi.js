import React from 'react';
import  fetchData  from "./JwtToken.js";
import datafetch from "./JwtToken.js";

function MyComponent() {
  const handleClick = () => {
    fetchData();
  };

  return (
    <button onClick={handleClick}>
      Fetch Data
    </button>
  );
}

export default MyComponent;