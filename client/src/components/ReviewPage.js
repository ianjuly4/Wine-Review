import React, {useState, useEffect} from "react"
import User from "./User"
import ReviewForm from "./ReviewForm"
import ReviewHeader from "./ReviewHeader"
import NavBar from "./NavBar"
import UserHeader from "./UserHeader"

function ReviewPage(){
    const[users, setUsers] = useState([])

    useEffect(() => {
        fetch("/users",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
          .then((r) => r.json())
          .then((userData) => {
            setUsers(userData);
          });
        }, []);

    return(
        <div className="bgcolor = bg-red-400">
            <NavBar/>
            <UserHeader/>
            <ul>
                {users.map((user, index) => {
                    return (<User key={user.id}
                    name={user.name}
                    number={index+1}
                    />
                    );
                })
            }
            </ul>
            <ReviewHeader/>
            <ReviewForm/>
        </div>
    )
}
export default ReviewPage