
import "./CSS/App.css";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import Header from "./Components/Header";
import FoodList from "./Features/foodList.jsx";
import { useDispatch, useSelector } from "react-redux";
import {fetchFood} from '../src/App/state/foodSlice.js'
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const foodData = useSelector(state => state.food.food);

  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Header />
        <div className="mt-4">
          <h2 className="text-center mt-1 mb-3"> Food inventory </h2>
          <FoodList foodData={foodData}/>
        </div>
      </div>
    </>
  );
}

export default App;

// THIS IS WHERE YOU PUT THE PIECES TOGETHER
