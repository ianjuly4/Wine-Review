import React, { useState, useEffect } from 'react';
import FormWine from "./FormWine";
import PatchHeader from './PatchHeader';
import PatchForm from './PatchForm';

function Post() {
  const [wines, setWines] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [flavorProfile, setFlavorProfile] = useState("");
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [starReview, setStarReview] = useState("");

  useEffect(() => {
    fetch("wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then((WineData) => {
        setWines(WineData);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("wines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        location: location,
        type: type,
        price: price,
        flavor_profile: flavorProfile,
        review: {
          comment: comment,
          star_review: starReview,
        },
        user: {
          name: user,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWines([...wines, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setName("");
    setLocation("");
    setType("");
    setPrice("");
    setFlavorProfile("");
    setComment("");
    setStarReview("");
    setUser("");
  }

  const handlePatchFormSubmit = (updatedWine) => {
    setWines(wines.map((wine) => (wine.id === updatedWine.id ? updatedWine : wine)));
  };

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="User Name"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          name="Wine Name"
          placeholder="Wine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>
          <input
            type="text"
            name="Wine Location"
            placeholder='Restaurant or Winery'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            name="Wine Type"
            placeholder='Wine Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            name="Flavor Profile"
            placeholder='Flavor Profile'
            value={flavorProfile}
            onChange={(e) => setFlavorProfile(e.target.value)}
          />
        </label>
        <label>
          <input
            type="number"
            name="Price"
            step="0.01"
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          <input
            type="text"
            name="Review"
            placeholder='Review '
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <label>
          <input
            type="number"
            name="Star Review"
            placeholder='Number of Stars'
            value={starReview}
            onChange={(e) => setStarReview(e.target.value)}
          />
        </label>
        <button type="submit">Add Wine</button>
      </form>

      <ul>
        {wines.map((wine, index) => (
          <FormWine
            key={wine.id}
            number={index + 1}
            name={wine.name}
            image={wine.image}
            location={wine.location}
            type={wine.type}
            price={wine.price}
            flavorProfile={wine.flavor_profile}
            wine={wine}
          />
        ))}
      </ul>
      <PatchHeader />
      <PatchForm onSubmit={handlePatchFormSubmit} />
    </div>
  );
}

export default Post;