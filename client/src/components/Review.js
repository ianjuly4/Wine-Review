import React from "react";

function Review({review, number, comment, star_review, user, wine}){
    
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
    return(
        <div className="Review">
            <h6>{wine}</h6>
            <p>{comment}</p>
            <h6>{displayStarRating(star_review)}</h6>
            <h6>{user}</h6>
  </div> 
    )   
}

export default Review