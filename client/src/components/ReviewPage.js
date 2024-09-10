import React, { useState, useEffect } from "react";
import User from "./User";
import ReviewForm from "./ReviewForm";
import ReviewHeader from "./ReviewHeader";
import NavBar from "./NavBar";
import UserHeader from "./UserHeader";
import UserPost from "./UserPost";
import Review from "./Review"

function ReviewPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Network response was not ok');
            }
            return r.json();
        })
        .then((userData) => {
            setUsers(userData);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        });
    }, []);
    useEffect(() => {
        fetch("/reviews", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Network response was not ok');
            }
            return r.json();
        })
        .then((reviewData) => {
            setReviews(reviewData);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        });
    }, []);

    const handleDelete = (userToDelete) => {
        const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
        setUsers(updatedUsers);
    };

    return (
        <div className="bg-red-400">
            <NavBar />
            <UserHeader />
            <UserPost setUsers={setUsers} />
            {error && <p className="error">{error}</p>}
            <ul>
                {users.map((user, index) => (
                    <User
                        key={user.id}
                        name={user.name}
                        number={index + 1}
                        handleDelete={handleDelete}
                        user={user}
                    />
                ))}
            </ul>
            <ReviewHeader />
            <ul>
                {reviews.map((review, index)=>
                    <Review
                        key={review.id}
                        comment={review.comment}
                        star_review={review.star_review}
                    />
                )}
            </ul>
            <ReviewForm />
        </div>
    );
}

export default ReviewPage;