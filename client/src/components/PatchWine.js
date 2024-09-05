import React from "react";

function PatchWine({user, name, type, location, flavorProfile, price, comment, starReview}){
    
    return(
        <li className="PatchWine">
        <h3>{name}</h3>
        <h5>UserName: {user}</h5>
        <h5>Location: {location}</h5>
        <h5>Type: {type}</h5>
        <h5>Flavor Profile: {flavorProfile}</h5>
        <h5>Price: {price}</h5>
        <h5>Review: {comment}</h5>
        <h5>Number of Reviews: {starReview}</h5> 
      </li>
    )
    
}
export default PatchWine