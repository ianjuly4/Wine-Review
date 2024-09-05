import React, {useEffect, useState} from "react";
import PatchWine from "./PatchWine";

function PatchForm(){
    const [wines, setWines] = useState("")

    useEffect(() =>{
        fetch("http://127.0.0.1:5555/wines",{
          method: "GET"
      })
      .then((r)=>r.json())
      .then((WineData)=>setWines(WineData))
      })
      
    return(
        <PatchWine/>
    )
}
export default PatchForm