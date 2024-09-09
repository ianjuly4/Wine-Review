import React from "react"
import NavBar from "./NavBar"
import Post from "./Post"
import FormHeader from "./FormHeader"

function  FormPage(){
    return(
        <div className="bgcolor = bg-red-400">
            <NavBar/>
            <FormHeader />
            <Post />
            
    
        </div>
    )
}
export default FormPage