
import "./CSS/App.css";
import Header from "./Components/Header";
import { useDispatch, } from "react-redux";
import {fetchFood} from '../src/App/state/foodSlice.js'
import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import FoodInventoryPage from './Pages/FoodInventoryPage.jsx'
import FoodCardDetailPage from './Pages/FoodCardDetailPage.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Header />
          <Routes>
              <Route path='/' element={<FoodInventoryPage/>} />
              <Route path='/directory/:foodCardId' element={<FoodCardDetailPage/>}/>
          </Routes>
        
      </div>
    </>
  );
}

export default App;

// THIS IS WHERE YOU PUT THE PIECES TOGETHER
