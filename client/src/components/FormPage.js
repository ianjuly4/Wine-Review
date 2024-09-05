import React from "react"
import NavBar from "./NavBar"
import Form from "./Form"
import FormHeader from "./FormHeader"
import FormPatchHeader from "./FormPatchHeader"
import PatchForm from "./PatchForm"

function  FormPage(){
    return(
        <div className="FormPage">
            <NavBar/>
            <FormHeader />
            <Form />
            <FormPatchHeader/>
            <PatchForm/>
        </div>
    )
}
export default FormPage