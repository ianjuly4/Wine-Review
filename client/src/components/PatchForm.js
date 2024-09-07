import React, {useEffect, useState} from "react";
import PatchWine from "./PatchWine";

function PatchForm(){
    const [wines, setWines] = useState([])
    const [number, setNumber] = useState("")

    useEffect(() => {
    fetch("http://127.0.0.1:5555/wines",{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
      .then((r) => r.json())
      .then((WineData) => {
        setWines(WineData);
      });
    }, []);
  
      return (
        <div className="PatchForm">
          <ul>
            {wines.map((wine, index) => (
              <PatchWine
                key={wine.id}
                number={index + 1} 
                user={wine.reviews[0]?.user?.name}
                name={wine.name}
                image={wine.image}
                location={wine.location}
                type={wine.type}
                price={wine.price}
                flavorProfile={wine.flavor_profile}
                comment={wine.reviews[0]?.comment}
                starReview={wine.reviews[0]?.star_review}
                wine={wine}
              />
            ))}
          </ul>
                <input 
                    type="number" 
                    name="Wine Number" 
                    placeholder="Wine Number" 
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                    />
        </div>
      );
}
export default PatchForm