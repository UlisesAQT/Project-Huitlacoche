import { useDispatch } from "react-redux";
import { fetchFood, adjustQuantity } from "../../App/state/foodSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { updateFood } from "../../App/state/foodSlice";



const FoodCard = ({ food, edit, onDelete, onUpdate }) => {
  const { id, name, quantity, category, cost, brand } = food;
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
const [ editableFood, setEditableFood] = useState({
  name,
  category,
  cost,
  brand,
  quantity
});

//Im adding this because of a bug i found when clicking the pencil icon, even if i hit cancel it saves the edits & useRef will fix this
const originalFood = useRef({name, category, cost, brand, quantity}); 


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



const handleSave = () => {
  let updatedPriceHistory = [...(food.priceHistory || [])];
  if (food.cost !== editableFood.cost) {
    updatedPriceHistory.push({
      price: editableFood.cost,
      date: new Date().toLocaleDateString(),
    })
  }
  const updatedFood = {
    ...food,
    ...editableFood,
    priceHistory: updatedPriceHistory,
  };

  dispatch(updateFood(updatedFood));
  setEditing(false);

}
const handleCancel = () => {
  setEditableFood(originalFood.current);
  onUpdate({...food, ...originalFood.current})
  setEditing(false);
};

 
  return (
    //This is the editing view
    <>
    {( edit || editing) ? ( // the reason why there is edd and editing is because, edit is for the toolbar and editing is the pencil edit(card)
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
            {editing && (
          <div className='btnGroup'>
            <button onClick={handleSave} >Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
            )}
            


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
        <strong> Quantity:</strong> {quantity}
        <button className="quantityBtn" onClick={() => handleQuantityChange(1)}>
          +
        </button>
      </div>
        <div className="editBtn">
          <button onClick={() => {
            originalFood.current = {name, category, cost, brand, quantity}; //references the useRef

            setEditableFood({ 
            name,
            category,
            cost,
            brand,
            quantity
          });
          setEditing(true); 
          }}>
            <i className="bi bi-pencil"></i>
            </button>
      </div>

    </div>
      
    )}
  </>
  );
};


export default FoodCard;

// const creatingFood = () => { // might have to fix this because this creates food not adds just one
//     dispatch(addFood({
//         name:food.name,
//         quantity: userQuantity || 1,
//         category: food.category,
//         brand: food.brand,
//         cost: food.cost
//     }));
// }

// const handleRemoveFood = () => {
//     dispatch(removeFood({
//         id: food.id,
//         amount: 1
//     }));
// }
