import { useDispatch } from "react-redux";
import { fetchFood, adjustQuantity, updateFood } from "../../App/state/foodSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {UNITS} from "../../Components/units"


const FoodCard = ({ food, edit, onDelete, onUpdate }) => {
  const { id, name, quantity, category, cost, brand, unit } = food;
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
const [ editableFood, setEditableFood] = useState({
  name,
  category,
  cost,
  brand,
  quantity
});



useEffect(() => {
  if (edit) {
    setEditableFood({name, category, cost, brand, quantity})
  }
}, [edit]);

const handleQuantityChange = (amount) => {
  const newQuantity =quantity + amount;
if (newQuantity < 0) return;
  const updatedFood = {
    ... food,
    quantity: newQuantity,
  }
  dispatch(updateFood(updatedFood));
}


  return (
    //This is the editing view
    <>
    { edit  ? ( // the reason why there is edd and editing is because, edit is for the toolbar and editing is the pencil edit(card)
      <div className="food-item">
        {edit && <button onClick={() => onDelete(id)}>X</button>}
        <div className="food-info">
          <input
            type="text"
            value={editableFood.name}
            onChange={(e) => {
              const updated = {...editableFood, name: e.target.value};
              setEditableFood(updated);
              onUpdate({...food, ...updated})
            }}
            />

            <select
              name="category"
              value={editableFood.category}
              onChange={(e) => {
                const updated = {...editableFood, category: e.target.value};
                setEditableFood(updated);
                onUpdate({...food, ...updated});
              }
            }>
              <option value="dry">Dry</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="frozen">Frozen</option>
              <option value="beverage">Beverage</option>
              <option value="alcohol">Alcohol</option>
              <option value="paper goods">Paper Goods</option>
              <option value="janitorial">Janitorial</option>

              </select>
            
            <input 
            type='number'
            min='0'
            value={editableFood.cost}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;
              const updated = { ...editableFood, cost: value };

              setEditableFood(updated);
              onUpdate({...food, ...updated})
            }}
            />

            <input 
            type="text"
            value={editableFood.brand}
            onChange={
              (e) => {
                const updated = { ...editableFood, brand: e.target.value };
                setEditableFood(updated);
                onUpdate({ ...food, ...updated });
              }}
            />

            <input
            type="number"
            min="0"
            value={editableFood.quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;
              const updated = { ...editableFood, quantity: value };
              setEditableFood(updated);
              onUpdate({ ...food, ...updated });
            }}
          />
        </div>
      </div>
    ): ( // this is the normal non editing view
       <div className="food_item">
      <Link to={`/directory/${id}`} className="text-decoration-none text-dark">
        <div className="food-info">
          <h3 className="food-name ms-5">{name}</h3>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Cost:</strong> {cost}
          </p>
          <p>
            <strong>Brand:</strong> {brand}
          </p>
        </div>
      </Link>
      <div className=" quantityRow ms-2">
        <button className="quantityBtn" onClick={() => handleQuantityChange(-1)}>
          -
        </button>
        <strong> {UNITS.find((u) => u.value === unit)?.label || "Quantity"}:</strong> {quantity}
        <button className="quantityBtn" onClick={() => handleQuantityChange(1)}>
          +
        </button>
      </div>
    </div>
      
    )}
  </>
  );
};


export default FoodCard;

