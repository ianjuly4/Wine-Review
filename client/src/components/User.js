import React from "react";

function User({ name, number, handleDelete, user }) {

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    fetch(`users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then(() => handleDelete(user)); 
  };

    return (
      <div className="User">
        <h6>{number}</h6>
        <h2>{name}</h2>
        <button className="Remove" onClick={handleDeleteClick}>
            Remove
          </button>
      </div>
    );
  }
  
  export default User;