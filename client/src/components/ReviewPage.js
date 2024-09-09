import React, {useState, useEffect} from "react"
import Review from "./Review"
import ReviewForm from "./ReviewForm"
import ReviewHeader from "./ReviewHeader"
import NavBar from "./NavBar"

function ReviewPage(){
    const[wines, setWines] = useState([])

    useEffect(() => {
        fetch("wines",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
          .then((r) => r.json())
          .then((wineData) => {
            setWines(wineData);
          });
        }, []);

    return(
        <div className="bgcolor = bg-red-400">
            <NavBar/>
            <ReviewHeader/>
            <ReviewForm/>
            <ul>
                {wines.map((wine) => {
                return wine.reviews.map((review) => {
                    return (<Review key={review.id}
                    name={wine.name}
                    user={review.user.name}
                    comment={review.comment}
                    starReview={review.star_review}
                    />
                    );
                });
            })}
            </ul>
        </div>
    )
}
export default ReviewPage