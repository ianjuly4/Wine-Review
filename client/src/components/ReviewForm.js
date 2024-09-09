import React, {useState, UseEffect} from "react";
import { useFormik} from "formik";
import * as yup from "yup";

function ReviewForm(){
  const [number, setNumber] = useState("")

  const formSchema = yup.object().shape({
    number: yup
      .number()
      .positive()
      .integer()
      .required("Must enter number of a listed wine to update review")
      .typeError("Please enter an Integer")
      .max(125),
  });

  const formik = useFormik({
    initialValues: {
      user: "",
      comment: "",
      starReview:"",
    },
    validationSchema: formSchema,
      onSubmit: (values) => {

      fetch(`/wines/${number}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },
  },
);

  return(
    <div>
      <form className="ReviewForm" onSubmit={formik.handleSubmit}>
        <input 
          type="number" 
          id="number" 
          placeholder="Wine Number"
          value={formik.values.number}
          onChange={(e) => {
                formik.handleChange(e);
                setNumber(e.target.value);
          }}
        />
        <input 
          type="text" 
          id="user" 
          placeholder="User"
          value={formik.values.user}
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
          id="starReview" 
          placeholder="number of stars"
          value={formik.values.starReview}
          onChange={formik.handleChange}
        />
        <button type="SUBMIT">Add Review</button>
        <p style={{ color: "black" }}> {formik.errors.number}</p> 
      </form>
    </div>
  )
}
export default ReviewForm