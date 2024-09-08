import React from "react"
import Review from "./Review"
import ReviewForm from "./ReviewForm"
import ReviewHeader from "./ReviewHeader"

function ReviewPage(){
    return(
        <div className="ReviewPage">
            <Review/>
            <ReviewForm/>
            <ReviewHeader/>
        </div>
    )
}
export default ReviewPage