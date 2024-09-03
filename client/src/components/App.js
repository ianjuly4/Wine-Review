import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import WineList from "./WineList";

function App() {
  return(
    <div className="App">
      <>
      <WineList/>
      </>
    </div>
  )
}

export default App;