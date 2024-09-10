import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function UserPost({ setUsers }) {

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("User Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch('http://127.0.0.1:5555/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((newUser) => {
          setUsers(prevUsers => [...prevUsers, newUser]);
          console.log(newUser);
          resetForm();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div>
      <form className="Form" onSubmit={formik.handleSubmit}>
      {formik.touched.name && formik.errors.name ? (
      <p style={{color:"Black", textAlign:"center"}}>{formik.errors.name}</p>
        ) : null}
          <input
            type="text"
            id="name"
            placeholder="User Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserPost;