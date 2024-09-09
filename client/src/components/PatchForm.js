import React, {useEffect, useState} from "react";
import { useFormik} from "formik";
import PatchWine from "./PatchWine";
import * as yup from "yup";

function PatchForm(){
    const [wines, setWines] = useState([])
    const [number, setNumber] = useState("")
    

    useEffect(() => {
    fetch("wines",{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
      .then((r) => r.json())
      .then((WineData) => {
        setWines(WineData);
      });
    }, []);

    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a name").max(15),
      type: yup.string(),
      location: yup.string(),
      flavorProfile: yup.string(),
      price: yup
        .number()
        .positive()
        .integer()
        .required("Must enter a price")
        .typeError("Please enter an Integer")
        .max(125),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        location: "",
        type:"",
        price:"",
        flavorProfile:"",
      },
      validationSchema: formSchema,
        onSubmit: (values) => {

        fetch(`/wines/${number}`, {
          method: "PATCH",
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

    return (
        <div>
          <form className="PatchForm" onSubmit={formik.handleSubmit}>
            <ul>
              {wines.map((wine, index) => (
                <PatchWine
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
                id="location"
                placeholder='Location' 
                value={formik.values.location}
                onChange={formik.handleChange}
                />
      
            <input
                type="text"
                id="flavorProfile"
                placeholder='Flavor Profile' 
                value={formik.values.flavorProfile}
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
                <button type="SUBMIT">Update Wine</button>
            </form>

        </div>
      );
}
export default PatchForm