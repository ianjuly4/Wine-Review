import React from "react";

function Review({ name, comment, starReview, user }) {
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
      <div className="Review">
        <h6>{name}</h6>
        <h6>{user}</h6>
        <p>{displayStarRating(starReview)}</p>
        <p>{comment}</p>
      </div>
    );
  }
  
  export default Review;