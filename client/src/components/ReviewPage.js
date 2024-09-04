import React from "react"
import NavBar from "./NavBar"
import Review from "./Review"
import ReviewHeader from "./ReviewHeader"

function  ReviewPage(){
    return(
        <div className="ReviewPage">
            <NavBar/>
            <ReviewHeader />
            <Review />
        </div>
    )
}
export default ReviewPage