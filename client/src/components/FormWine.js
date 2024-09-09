import React, {useState} from "react";

function FormWine({wine, user, name, type, location, 
    flavorProfile, price, comment, starReview, number}){
    const [patchWine, setPatchWine] = useState("")

    const handleUpdateClick = () =>{
        fetch(`wines/${wine.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type": "application/json"
          }
      })
      .then((r)=>r.json())
      window.location.reload()
      }


    return(
        <li className="FormWine">
            <h6>{number}</h6>
            <h3>{name}</h3>
            <h5>Location: {location}</h5>
            <h5>{type}</h5>
            <h5>Flavor: {flavorProfile}</h5>
            <h5>${price}</h5>


      </li>
    )
    
}
export default FormWine