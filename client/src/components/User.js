import React from "react";

function User({ name, number, handleDelete, user }) {

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    fetch(`http://127.0.0.1:5555/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error('Network response was not ok');
        }
        return r.json();
      })
      .then(() => handleDelete(user))
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error.message);
      });
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