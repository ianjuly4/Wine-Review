import React, { useState} from "react"


function Wine({name,location, price, handleDelete, type, wine, flavor_profile}){
  

  const handleDeleteClick = () =>{
    fetch(`http://127.0.0.1:5555/wines/${wine.id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      }
  })
  .then((r)=>r.json())
  .then(()=>handleDelete("My bad, thought you really liked that one"))
 
  }
  
  
  return (
      <li className="Wine">
        <h3>{name}</h3>
        <h5>Location: {location}</h5>
        <h5>Type: {type}</h5>
        <h5>Flavor Profile: {flavor_profile}</h5>
        <h5>Price: {price}</h5>
        <button className="Remove" 
        onClick={handleDeleteClick}>Remove</button>
       
      </li>
    );
}  
export default Wine