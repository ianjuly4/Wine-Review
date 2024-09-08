import React, { useState } from "react";

function Wine({ name, location, price, handleDelete, type, wine, flavor_profile }) {
  const [isClicked, setIsClicked] = useState(false);
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState("")
  const [starReviews, setStarReviews] = useState("")

  const handleDeleteClick = () => {
    fetch(`http://127.0.0.1:5555/wines/${wine.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then(() => handleDelete("My bad, thought you really liked that one"));
  };

  const handleClick = () => {
    fetch(`http://127.0.0.1:5555/wines/${wine.id}/users`,{
      method: "Get",
      headers:{
         "Content-Type": "application/json"
      }
    })
    .then((r) => r.json())
    .then((UserData) => {
      setUsers(UserData);
    });
    setIsClicked(!isClicked);
  };

  const displayStarRating = (rating) => {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }

    return stars;
  };

  return (
    <li className="Wine" onClick={handleClick}>
      {isClicked ? null : (
        <div>
          <h3>{name}</h3>
          <h5>{type}</h5>
          <h5>Location: {location}</h5>
          <h5>Flavor: {flavor_profile}</h5>
          <h5>${price}</h5>
          <button className="Remove" onClick={handleDeleteClick}>
            Remove
          </button>
        </div>
      )}


      {isClicked ? (
        users.map((user) => (
          <div key={user.id}>
          <h4>{user.name}</h4>
          <h6>{displayStarRating(user.reviews[0]?.star_review)}</h6>
          <p>{user.reviews[0]?.comment}</p>
        </div>
        ))
      ) : null} 
    </li>
  );
}

export default Wine;