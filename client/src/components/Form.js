import React, {useState} from 'react'


function Form(){
    const [wine, setWine] = useState("");
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [flavorProfile, setFlavorProfile] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault();
        const newWine = {
            name: wine,
            location: location,
            type: type,
            price: price,
            imageUrl: image,
            flavorProfile: flavorProfile
        }
        fetch("http://127.0.0.1:5555/wines", {
            method: "POST",
            headers: {
                "content-type" : "application/Json",
            },
            body: JSON.stringify(newWine)
        })
        .then((r)=>r.json())
        .then((newWine)=>console.log(newWine))
        setWine("")
        setLocation("")
        setType("")
        setPrice("")
        setImage("")
    }
    return(
        <div>
            <form className="Form" onSubmit={handleSubmit} >
                <label>
                    <input 
                        type="text" 
                        name="Wine Name" 
                        placeholder="Wine Name" 
                        value={wine}
                        onChange={(e)=>setWine(e.target.value)}
                    />
                </label>
                <label>
                <input 
                        type="text" 
                        name="Wine Image" 
                        placeholder="Wine Image" 
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="Wine Location"
                        placeholder='Restaurant or Winery' 
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="Wine Type"
                        placeholder='Wine Type' 
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                    />
                </label>
        
                <label>
                    <input
                        type="text"
                        name="Flavor Profile"
                        placeholder='Flavor Profile' 
                        value={flavorProfile}
                        onChange={(e)=>setFlavorProfile(e.target.value)}
                    />
                </label>
                <label>
                <input
                        type="text"
                        name="Price"
                        placeholder='Price' 
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                </label>
                <button type="submit">Add Wine</button>
            </form>
        </div>
    )
}
export default Form