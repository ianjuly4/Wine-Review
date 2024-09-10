import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import FormWine from "./FormWine";
import PatchHeader from './PatchHeader';
import PatchForm from './PatchForm';

function Post() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch("/wines", {
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

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Wine Name is required"),
    type: yup
      .string()
      .required("Type is required"),
    location: yup
      .string()
      .required("Location is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive"),
    flavor_profile: yup
      .string()
      .required("Flavor Profile is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      location: "",
      price: "",
      flavor_profile: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch('/wines', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setWines([...wines, data]);
          console.log(data)
          resetForm();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  const handlePatchFormSubmit = (updatedWine) => {
    setWines(wines.map((wine) => (wine.id === updatedWine.id ? updatedWine : wine)));
  }

  return (
    <div>
      <form className="Form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Wine Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            />
          <input
            type="text"
            id="type"
            placeholder='Wine Type'
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="flavor_profile"
            placeholder='Flavor Profile'
            value={formik.values.flavor_profile}
            onChange={formik.handleChange}
          />
          <input
            type="number"
            id="price"
            step="0.01"
            placeholder='Price'
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="location"
            placeholder='Restaurant or Winery'
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        <button type="submit">Add Wine</button>
        {formik.touched.name && formik.errors.name ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.name}</p>
        ) : null}
        {formik.touched.type && formik.errors.type ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.type}</p>
        ) : null}
        {formik.touched.location && formik.errors.location ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.location}</p>
        ) : null}
        {formik.touched.price && formik.errors.price ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.price}</p>
        ) : null}
        {formik.touched.flavor_profile && formik.errors.flavor_profile ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.flavor_profile}</p>
        ) : null}
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
export default Post