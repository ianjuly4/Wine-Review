import React, {useState} from 'react'


function Form(){
    const [wine, setWine] = useState("");
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [flavorProfile, setFlavorProfile] = useState("")
    const [user, setUser] = useState("")
    const [comment, setComment] = useState("")
    const [starReview, setStarReview] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        const newWine = {
            name: wine,
            location: location,
            type: type,
            price: price,
            flavorProfile: flavorProfile, 
        }
        const newUser = {
            name: user
        }
        const newReview = {
            comment: comment,
            starReview: starReview
        }

        fetch("http://127.0.0.1:5555/wines", {
            method: "POST",
            headers: {
                "content-type" : "application/json",
            },
            body: JSON.stringify(newWine, newUser)
        })
        .then((r)=>r.json())
        .then((newWine)=>console.log(newWine))
        setWine("")
        setLocation("")
        setType("")
        setPrice("")
        setFlavorProfile("")
        setUser("")
    }

   
    return(
        <div>
            <form className="Form" onSubmit={handleSubmit} >
                <label>
                <input 
                        type="text" 
                        name="User Name" 
                        placeholder="User Name" 
                        value={user}
                        onChange={(e)=>setUser(e.target.value)}
                    />
                </label>
                    <input 
                        type="text" 
                        name="Wine Name" 
                        placeholder="Wine Name" 
                        value={wine}
                        onChange={(e)=>setWine(e.target.value)}
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
                        type="integer"
                        name="Price"
                        placeholder='Price' 
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                     <input
                        type="text"
                        name="Comment"
                        placeholder='Comment' 
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                     <input
                        type="integer"
                        name="Star Review"
                        placeholder='How Many Stars?' 
                        value={starReview}
                        onChange={(e)=>setStarReview(e.target.value)}
                    />
                    
                </label>
                <button type="submit">Add Wine</button>
            </form>
        </div>
    )
}
export default Form