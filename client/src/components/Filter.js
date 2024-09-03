import React from "react"


function Filter({ 
  onSearchWineNameChange, 
  onSearchWineTypeChange,
  searchWineName,
  searchWineType,
  handlePriceChange
 }){

  const handleWineNameChange = (e) => {
    onSearchWineNameChange(e.target.value)
  }

  const handleWineTypeChange = (e) => {
    onSearchWineTypeChange(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearchWineTypeChange(e.target.value)
    onSearchWineNameChange(e.target.value)
  }

  
 
    return (
        <div className="Filter" onSubmit={handleSubmit} >
          <input type="text" 
          name="SearchWineName"
          value={searchWineName} 
          onChange={handleWineNameChange}
          placeholder="Wine Name"/>

          <input type="text" 
          onSubmit={handleSubmit}
          name="SearchWineType"
          value={searchWineType} 
          onChange={handleWineTypeChange}
          placeholder="Wine Type" />

          <select name="Filter" onChange={handlePriceChange}>
            <option value="All">Price</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
      );

}
export default Filter