import React, {useState, useEffect} from 'react'

function Review({wine, user, name, type, location, 
  flavorProfile, price, comment, starReview, number}){

  
  return (
    <li className="Wine">
      <h3>{name}</h3>
      <h5>Type: {type}</h5>
      <h5>Flavor Profile: {flavorProfile}</h5>
      <h5>Price: {price}</h5>
      
     
    </li>
  );
    
}
    
export default Review

