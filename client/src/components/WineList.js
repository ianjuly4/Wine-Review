import React, {useEffect, useState } from "react"
import Header from "./Header"
import Wine from "./Wine"
import Filter from "./Filter"
import NavBar from "./NavBar"




function WineList(){
  const [wines, setWines] = useState([])
  const [wineName, setWineName] = useState("")
  const [wineType, setWineType] = useState("")
  const [winePrice, setWinePrice] = useState("All")



  useEffect(() => {
    fetch("/wines",{
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

    const onSearchWineNameChange = (text) => {
      setWineName(text)
    }
    const onSearchWineTypeChange = (text) => {
      setWineType(text)
    }

    const handlePriceChange = (e) => {
      setWinePrice(e.target.value)
    }
  
    const handleDelete = (clickedDelete) => {
      const updatedWines = wines.filter((wine) => wine.id !== clickedDelete.id);
      setWines(updatedWines);
    };
    
    const filteredwines = wines
      .filter((wine) => {
        if (winePrice === "All") return true;
        return wine.price === winePrice;
      })
      .filter((wine) => wine.type.toLowerCase().includes(wineType.toLowerCase()))
      .filter((wine) => wine.name.toLowerCase().includes(wineName.toLowerCase()));

  return(
    
  <div className="bgcolor = bg-red-400">
    
  <>
    <NavBar/>
    <Header/>
    <Filter 
      onSearchWineTypeChange={onSearchWineTypeChange}
      onSearchWineNameChange={onSearchWineNameChange}
      handlePriceChange={handlePriceChange}
      searchWineName={wineName}
      searchWineType={wineType}

      />
    <ul>{filteredwines.map((wine)=>{
      return <Wine key={wine.id}
      name={wine.name} 
      image={wine.image}
      location={wine.location}
      type={wine.type}
      price={wine.price}
      flavor_profile={wine.flavor_profile}
      wine={wine}
      handleDelete={handleDelete}
      />
      
    })
    }</ul>
    <h5>Please click on individual wines for their respective users and user-reviews. </h5>
  </>
  </div>
  )
}
export default WineList
