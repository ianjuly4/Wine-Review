import React from "react";

function Filter({ 
  onSearchWineNameChange, 
  onSearchWineTypeChange,
  onSearchWinePriceChange,
  searchWineName,
  searchWineType,
  searchWinePrice
 }){

  const handleWineNameChange = (e) => {
    onSearchWineNameChange(e.target.value);
  }

  const handleWineTypeChange = (e) => {
    onSearchWineTypeChange(e.target.value);
  }

  const handleWinePriceChange = (e) =>{
    onSearchWinePriceChange(e.target.value);
  }

  return (
    <div className="Filter">
      <input 
        type="text" 
        name="SearchWineName"
        value={searchWineName} 
        onChange={handleWineNameChange}
        placeholder="Wine Name"
      />
      <input 
        type="text" 
        name="SearchWineType"
        value={searchWineType} 
        onChange={handleWineTypeChange}
        placeholder="Wine Type" 
      />
      <input 
        type="number" 
        name="SearchWinePrice"
        value={searchWinePrice} 
        onChange={handleWinePriceChange}
        placeholder="Wine Price"
      />
    </div>
  );
}

export default Filter;