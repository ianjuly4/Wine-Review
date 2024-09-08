import React, {useEffect, useState} from "react"
import NavBar from "./NavBar"
import About from "./About"
import AboutHeader from "./AboutHeader"

function  AboutPage(){
    const[wines, setWines] = useState([])

    
      
    return(
        <div className="AboutPage">
            <NavBar/>
            <AboutHeader />
            <About/>
        </div>
    )
}
export default AboutPage
