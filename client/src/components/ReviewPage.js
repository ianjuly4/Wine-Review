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
      .then((userData)=>setWines(userData))
      },[])
      
    return(
        <div className="ReviewPage">
            <NavBar/>
            <ReviewHeader />
            <ul>{wines.map((user)=>{
                return <Review key={user.id}
                name={user.name} 
                type={user.type}
                price={user.price}
                flavor_profile={user.flavor_profile}
                comment={user.reviews[0]?.comment}
                starReview={user.reviews[0]?.star_review}
               
            />
            })
    }</ul>
        </div>
    )
}
export default ReviewPage
