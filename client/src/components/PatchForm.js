import React, {useEffect, useState} from "react";
import PatchWine from "./PatchWine";

function PatchForm(){
    const [wines, setWines] = useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:5555/wines",{
          method: "GET"
      })
      .then((r)=>r.json())
      .then((WineData)=>setWines(WineData))
      })
      return(
        <div className="PatchForm">
            <ul>{wines.map((wine)=>{
                return <PatchWine key={wine.id}
                user={wine.user}
                name={wine.name} 
                image={wine.image}
                location={wine.location}
                type={wine.type}
                price={wine.price}
                flavorProfile={wine.flavor_profile}
                comment={wine.comment}
                starReview={wine.starReview}
                wine={wine}
                /> 
            })}
            </ul>
        </div>
        
      )
}
export default PatchForm