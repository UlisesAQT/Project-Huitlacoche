import { useState } from "react";
import "./App.css";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import Header from "./Components/Header";
import FoodList from "./Features/foodList.jsx"
import { FOOD } from "./App/testData.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <div className="mt-4">
          <h2> Food inventory </h2>
          <FoodList />
        </div>
      </div>
    </>
  );
}

export default App;

// THIS IS WHERE YOU PUT THE PIECES TOGETHER
