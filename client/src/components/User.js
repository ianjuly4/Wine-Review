import React from "react";

function User({ name, number }) {
  
    return (
      <div className="User">
        <h6>{number}</h6>
        <h2>{name}</h2>
      </div>
    );
  }
  
  export default User;