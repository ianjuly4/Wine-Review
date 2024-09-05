import React, {useState} from 'react'


function Form(){
    const [name, setName] = useState("");
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [flavorProfile, setFlavorProfile] = useState("")
   

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5555/wines", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                location: location,
                type: type,
                price: price,
                flavor_profile: flavorProfile, 
            }),
          })
       
        .then((r)=>r.json())
        .then((newWine)=>console.log(newWine))
        setName("")
        setLocation("")
        setType("")
        setPrice("")
        setFlavorProfile("")
       
    }

   
    return(
        <div>
            <form className="Form" onSubmit={handleSubmit} >
                <label>
                
                </label>
                    <input 
                        type="text" 
                        name="Wine Name" 
                        placeholder="Wine Name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
               

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
                        type="number"
                        name="Price"
                        step="0.01"
                        placeholder='Price' 
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </label>
                <button type="submit">Add Wine</button>
            </form>
        </div>
    )
}
export default Form