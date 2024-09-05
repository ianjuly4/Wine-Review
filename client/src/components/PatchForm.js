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
            <ul>{wines.map((wine, review)=>{
                return <PatchWine key={wine.id}
                user={wine.reviews[0]?.user?.name}
                name={wine.name} 
                image={wine.image}
                location={wine.location}
                type={wine.type}
                price={wine.price}
                flavorProfile={wine.flavor_profile}
                comment={wine.reviews[0]?.comment} // Access the comment from the first review
                starReview={wine.reviews[0]?.star_review}
                wine={wine}
                /> 
            })}
            </ul>
        </div>
        
      )
}
export default PatchForm