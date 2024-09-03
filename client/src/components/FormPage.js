import React from "react"
import NavBar from "./NavBar"
import Form from "./Form"
import FormHeader from "./FormHeader"

function  FormPage(){
    return(
        <div className="FormPage">
            <NavBar/>
            <FormHeader />
            <Form />
        </div>
    )
}
export default FormPage