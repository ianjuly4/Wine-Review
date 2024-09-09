import React from "react"
import NavBar from "./NavBar"
import Form from "./Form"
import FormHeader from "./FormHeader"
import FormPatchHeader from "./FormPatchHeader"
import PatchForm from "./PatchForm"
import ReviewPage from "./ReviewPage"

function  FormPage(){
    return(
        <div className="bgcolor = bg-red-400">
            <NavBar/>
            <FormHeader />
            <Form />
            <PatchForm/>
            <FormPatchHeader/>
            <ReviewPage/>
        </div>
    )
}
export default FormPage