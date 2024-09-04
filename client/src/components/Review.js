import React, {useState, useEffect} from 'react'

function Review(){
    const[review, setReviews] = useState("")

    useEffect(() =>{
        fetch("http://127.0.0.1:5555/reviews",{
          method: "GET"
      })
      .then((r)=>r.json())
      .then((reviewData)=>setReviews(reviewData))
      })
      
    return(
        <li className="Review">
        <h3>{review.comment}</h3>
       
       
      </li>
    )
}

    
    
export default Review