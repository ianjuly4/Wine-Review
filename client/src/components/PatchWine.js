import React, {useState} from "react";

function PatchWine({wine, user, name, type, location, 
    flavorProfile, price, comment, starReview, number}){
    const [patchWine, setPatchWine] = useState("")

    const handleUpdateClick = () =>{
        fetch(`http://127.0.0.1:5555/wines/${wine.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type": "application/json"
          }
      })
      .then((r)=>r.json())
      window.location.reload()
      }


    return(
        <li className="PatchWine">
            <h6>{number}</h6>
            <h3>{name}</h3>
            <h5>Location: {location}</h5>
            <h5>Type: {type}</h5>
            <h5>Flavor Profile: {flavorProfile}</h5>
            <h5>Price: {price}</h5>


      </li>
    )
    
}
export default PatchWine