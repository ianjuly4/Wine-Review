import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function PatchForm({ onSubmit }) {
  const [number, setNumber] = useState("");

  const formSchema = yup.object().shape({
    number: yup
      .number()
      .positive()
      .integer()
      .required("Must enter number of a listed wine")
      .typeError("Please enter an Integer")
      .max(125),
      name: yup
        .string()
        .required("Wine Name is required"),
      type: yup
        .string()
        .required("Type is required"),
      location: yup
        .string(),
    price: yup
      .number()
      .positive()
      .typeError("Please enter a valid price")
      .max(100),
    flavor_profile: yup
      .string(),
  
  });
  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      location: "",
      type: "",
      price: "",
      flavor_profile: "",
    },
    validationSchema: formSchema,
    onSubmit: (values,{resetForm}) => {
      fetch(`/wines/${values.number}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          onSubmit(data);
          console.log(data)  
          resetForm()
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div>
      <form className="PatchForm" onSubmit={formik.handleSubmit}>
        {formik.touched.number && formik.errors.number ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.number}</p>
        ) : null}
        {formik.touched.name && formik.errors.name ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.name}</p>
        ) : null}
        {formik.touched.type && formik.errors.type ? (
          <p style={{color:"Black", textAlign:"center"}}>{formik.errors.type}</p>
        ) : null}
        <input
          type="number"
          id="number"
          placeholder="Wine Number"
          value={formik.values.number}
          onChange={formik.handleChange}
        />

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
          placeholder="Wine Type"
          value={formik.values.type}
          onChange={formik.handleChange}
        />
      
        <input
          type="text"
          id="location"
          placeholder="Location"
          value={formik.values.location}
          onChange={formik.handleChange}

        />
      
        <input
          type="text"
          id="flavor_profile"
          placeholder="Flavor Profile"
          value={formik.values.flavor_profile}
          onChange={formik.handleChange}
        />
      
        <input
          type="number"
          id="price"
          step="0.01"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <button type="submit">Update Wine</button>
      </form>
    </div>
  );
}

export default PatchForm;