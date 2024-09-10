import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ReviewForm() {
  const [number, setNumber] = useState("");

  const formSchema = yup.object().shape({
    user_id: yup
      .number()
      .positive()
      .integer()
      .required("Must enter number of a listed user to create a new review")
      .typeError("Please enter an Integer")
      .max(125),
    wine_id: yup
      .number()
      .positive()
      .integer()
      .required("Must enter number of a listed wine to create a new review")
      .typeError("Please enter an Integer")
      .max(125),
  });

  const formik = useFormik({
    initialValues: {
      wine_id: "",
      user_id: "",
      comment: "",
      star_review: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:5555/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div>
      <form className="ReviewForm" onSubmit={formik.handleSubmit}>
        <input 
          type="number" 
          id="wine_id" 
          placeholder="Wine Number"
          value={formik.values.wine_id}
          onChange={formik.handleChange}
        />
        <input 
          type="number" 
          id="user_id" 
          placeholder="User number"
          value={formik.values.user_id}
          onChange={formik.handleChange}
        /> 
        <input 
          type="text" 
          id="comment" 
          placeholder="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        /> 
        <input 
          type="number" 
          id="star_review" 
          placeholder="number of stars"
          value={formik.values.star_review}
          onChange={formik.handleChange}
        />
        <button type="SUBMIT">Add Review</button>
        {formik.touched.wine_id && formik.errors.wine_id ? (
          <p style={{ color: "Black", textAlign: "center" }}>{formik.errors.wine_id}</p>
        ) : null}
        {formik.touched.user_id && formik.errors.user_id ? (
          <p style={{ color: "Black", textAlign: "center" }}>{formik.errors.user_id}</p>
        ) : null}
      </form>
    </div>
  );
}

export default ReviewForm;