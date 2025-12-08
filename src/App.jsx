import { useState } from "react";
import "./App.css";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import Header from "./Components/Header";
import FoodList from "./Features/foodList.jsx"
import { FOOD } from "./App/testData.jsx";
import { useReducer, useEffect } from 'react';
import { initialInventory, InventoryReducer } from "./App/state/inventoryReducer.js";





function App() {
  const [inventory, dispatch ] = useReducer(InventoryReducer, initialInventory);

  useEffect(() => {
    dispatch({type: 'INIT', payload: FOOD });

  }, []);

  useEffect(()=> {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory])




  return (
    <>
      <div className="App">
        <Header />
        <div className="mt-4">
          <h2 className="text-center mt-1 mb-3" > Food inventory </h2>
          <FoodList foodData={inventory} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}

export default App;

// THIS IS WHERE YOU PUT THE PIECES TOGETHER
