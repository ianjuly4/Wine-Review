import React, {useState, useEffect} from 'react'

function Review({wine, user, name, type, 
  flavorProfile, price, comment, starReview}){
    const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <li className="ReviewWine" onClick={handleClick}>
      {isClicked ? null : (
        <div>
          <h3>{name}</h3>
          <h5>{type}</h5>
        </div>
      )}

      {/* Render different content based on the click state */}
      {isClicked ? (
        <div>
          <p>{comment}</p>
          <p>{starReview} stars</p>
          {/* Add more content here */}
        </div>
      ) : null}
    </li>
  );
}

export default Review;
