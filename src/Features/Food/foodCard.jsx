import { useDispatch } from "react-redux";
import { fetchFood, adjustQuantity } from "../../App/state/foodSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateFood } from "../../App/state/foodSlice";



const FoodCard = ({ food, edit, onDelete }) => {
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
  setEditableFood({
    name,
    category,
    cost,
    brand,
    quantity
  });

  setEditing(false);
};

 
  return (
    <>
    {editing ? ( // this is the editing view
      <div className="food-item">
        <div className="food-info">
          <input
            type="text"
            value={editableFood.name}
            onChange={(e)=> setEditableFood({... editableFood, name: e.target.value})
            }/>

            <select
              name="category"
              value={editableFood.category}
              onChange={(e) => setEditableFood({... editableFood, category: e.target.value})
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
              setEditableFood({
                ...editableFood, cost: Number(e.target.value)
              })
            }}
            
            />

            <input 
            type="text"
            value={editableFood.brand}
            onChange={(e) => setEditableFood({
              ... editableFood, brand: e.target.value
            })}
            />

            <input
            type="number"
            min="0"
            value={editableFood.quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;

              setEditableFood({
                ...editableFood,
                quantity: value
              });
            }}
          />
            
          <div className='btnGroup'>
            <button onClick={handleSave} >Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
            


        </div>
      </div>
    ): ( // this is the normal non editing view
       <div className="food_item">
        {edit && <button onClick={() => onDelete(id)}>X</button>}
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
          <button onClick={() => {setEditableFood({ 
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
