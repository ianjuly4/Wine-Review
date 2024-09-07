import React, {useEffect, useState} from "react"
import NavBar from "./NavBar"
import Review from "./Review"
import ReviewHeader from "./ReviewHeader"

function  ReviewPage(){
    const[wines, setWines] = useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:5555/wines",{
          method: "GET",
          headers:{
            "Content-Type": "application/json",
          },
      })
      .then((r)=>r.json())
      .then((wineData)=>setWines(wineData))
      },[])
      
    return(
        <div className="ReviewPage">
            <NavBar/>
            <ReviewHeader />
            <ul>{wines.map((wine, index)=>{
                return <Review key={wine.id}
                number={index + 1} 
                user={wine.reviews[0]?.user?.name}
                name={wine.name} 
                type={wine.type}
                price={wine.price}
                flavor_profile={wine.flavor_profile}
                comment={wine.reviews[0]?.comment}
                starReview={wine.reviews[0]?.star_review}
                wine={wine}
            />
            })
    }</ul>
        </div>
    )
}
export default ReviewPage
