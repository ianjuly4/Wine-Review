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

    function handleSubmit(e) {
      e.preventDefault();
      fetch(`http://127.0.0.1:5555/wines/${number}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          location: location,
          type: type,
          price: price,
          flavor_profile: flavorProfile
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    
      setName("");
      setNumber("");
      setLocation("");
      setType("");
      setPrice("");
      setFlavorProfile("")
    }      
    return (
        <div>
          <form className="PatchForm" onSubmit={handleSubmit}>
            <ul>
              {wines.map((wine, index) => (
                <PatchWine
                  key={wine.id}
                  number={index + 1} 
                  name={wine.name}
                  image={wine.image}
                  location={wine.location}
                  type={wine.type}
                  price={wine.price}
                  flavorProfile={wine.flavor_profile}
                  wine={wine}
                />
              ))}
            </ul>
            <input 
                type="number" 
                name="Wine Number" 
                placeholder="Wine Number" 
                value={number}
                onChange={(e) => {
                setNumber(e.target.value)}}
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
                name="Wine Type"
                placeholder='Wine Type' 
                value={type}
                onChange={(e)=>setType(e.target.value)}
                />
            <input
                type="text"
                name="Wine Location"
                placeholder='Location' 
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
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
                <button type="submit">Update Wine</button>
            </form>

        </div>
      );
}
export default PatchForm