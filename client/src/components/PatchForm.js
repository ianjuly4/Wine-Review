import React, {useEffect, useState} from "react";
import PatchWine from "./PatchWine";

function PatchForm(){
    const [wines, setWines] = useState([])
    const [number, setNumber] = useState("")
    const [name, setName] = useState("");
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [flavorProfile, setFlavorProfile] = useState("")
    const [user, setUser] = useState("")
    const [comment, setComment] = useState("")
    const [starReview, setStarReview] = useState("")

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
                type="text" 
                name="User Name" 
                placeholder="User Name" 
                value={user}
                onChange={(e) => {
                setUser(e.target.value)}}
                />
            <input 
                type="text" 
                name="Wine Name" 
                placeholder="Wine Name" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            <input
                type="text"
                name="Wine Location"
                placeholder='Restaurant or Winery' 
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                />
            <input
                type="text"
                name="Wine Type"
                placeholder='Wine Type' 
                value={type}
                onChange={(e)=>setType(e.target.value)}
                />
            <input
                type="text"
                name="Flavor Profile"
                placeholder='Flavor Profile' 
                value={flavorProfile}
                onChange={(e)=>setFlavorProfile(e.target.value)}
                  />
            <input
                type="number"
                name="Price"
                step="0.01"
                placeholder='Price' 
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
            <input
                type="text"
                name="Review"
                placeholder='Review ' 
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                    />
            <input
                type="number"
                name="Star Review"
                placeholder='Number of Stars' 
                value={starReview}
                onChange={(e)=>setStarReview(e.target.value)}
                    />
  
                <button type="submit">Update Wine</button>
        </div>
      );
}
export default PatchForm