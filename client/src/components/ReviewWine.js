import React from "react";

function ReviewWine({number, name}){
    return(
        <div className="ReviewWine">
        <h3>{number}</h3>
          <h5>{name}</h5>
        </div>
    )
}
export default ReviewWine