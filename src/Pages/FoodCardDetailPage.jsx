import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { updateFood } from "../App/state/foodSlice";
import '../CSS/FoodCardDetail.css'
import { UNITS } from "../Components/units";

const FoodCardDetail = () => {
  const { foodCardId } = useParams();
  const products = useSelector((state) => state.food.food) || [];

  const food = products.find((item) => item.id === foodCardId);

  console.log("param", foodCardId);
  console.log("products", products);

  if (!products.length) return <h2 className="loading">Loading...</h2>;

  if (!food) return <h2>Food item not found</h2>;
  return <DetailModal food={food} />;
};

const DetailModal = ({ food }) => {
  const dispatch = useDispatch();
  const { name, quantity, category, cost, brand, unit, storageDate } = food;
  const [editing, setEditing] = useState(false);
  const [editableFood, setEditableFood] = useState({name, category, cost, brand, quantity, unit, storageDate});
  const originalFood = useRef({name, category, cost, brand, quantity, unit, storageDate});


const handleSave = () => {
  //This part below, updates the price history by comparing it to the old one
    let updatedPriceHistory = [...(food.priceHistory || [])];
    if (food.cost !== editableFood.cost) {
      updatedPriceHistory.push({
        price: editableFood.cost,
        date: new Date().toLocaleDateString(),
      });
    }
    dispatch(updateFood({ ...food, ...editableFood, priceHistory: updatedPriceHistory }));
    setEditing(false);
  };

const handleQuantityChange = (amount) => {
  const newQuantity = quantity + amount;
  if (newQuantity < 0) return;
  dispatch(updateFood({ ...food, quantity: newQuantity}));
}

const handleCancel = () => {
    setEditableFood(originalFood.current);
    setEditing(false);
  };

  const startEditing = () => {
    originalFood.current = {name, category, cost, brand, quantity, unit, storageDate};
    setEditableFood({name, category, cost, brand, quantity, unit, storageDate})
    setEditing(true);
  }


  if (editing) {
    return (
      <div className="detail-edit">
        <input
          type="text"
          value={editableFood.name}
          onChange={(e) => setEditableFood({ ...editableFood, name: e.target.value })}
        />
        <select
          value={editableFood.category}
          onChange={(e) => setEditableFood({ ...editableFood, category: e.target.value })}
        >
          <option value="dry">Dry</option>
          <option value="refrigerated">Refrigerated</option>
          <option value="frozen">Frozen</option>
          <option value="beverage">Beverage</option>
          <option value="alcohol">Alcohol</option>
          <option value="paper goods">Paper Goods</option>
          <option value="janitorial">Janitorial</option>
        </select>
        <input
          type="number"
          min="0"
          value={editableFood.cost}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 0) return;
            setEditableFood({ ...editableFood, cost: value });
          }}
        />
        <input
          type="text"
          value={editableFood.brand}
          onChange={(e) => setEditableFood({ ...editableFood, brand: e.target.value })}
        />
        <input
          type="number"
          min="0"
          value={editableFood.quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 0) return;
            setEditableFood({ ...editableFood, quantity: value });
          }}
        />
        <select
        value={editableFood.unit}
        onChange={(e) => setEditableFood({... editableFood, unit: e.target.value})}
        >
          {UNITS.map((u) => (
            <option key={u.value} value={u.value} >{u.label}</option>
          ))}
        </select>
        {(editableFood.category === "frozen" || editableFood.category === "refrigerated") && (
          <input 
          type="date"
          value={editableFood.storageDate}
          onChange={(e) => setEditableFood({...editableFood, storageDate: e.target.value})}
          />
        )}
        <div className="btnGroup">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }




  
  return (
    <div className="detail-modal">
      <h1 className="food-name ">{name}</h1>
      <div className="detail-grid">
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Brand:</strong> {brand}
      </p>
      <p>
        <strong>Cost:</strong> {cost}
      </p>

      <p className="quantityRow">
          <strong>{UNITS.find((u) => u.value === unit)?.label || "Quantity"}:</strong>
          <button className="quantityBtn" onClick={() => handleQuantityChange(-1)}>-</button>
         {quantity}
          <button className="quantityBtn" onClick={() => handleQuantityChange(1)}>+</button>
      </p>
        {(category === "frozen" || category=== "refrigerated") && storageDate && (
          <p>
            <strong>{category === "frozen" ? "Frozen Since:" : "Refrigerated Since:"}</strong> {storageDate}
          </p>
        )}


     </div>
     <button className="editBtn" onClick={startEditing}>
        <i className="bi bi-pencil"></i>
     </button>
    </div>
  );
};
export default FoodCardDetail;


/* IN ORDER TO BUILD THE PRICE CHANGE CHART: 
- Build an edit feature (so every time the price changes, it pushes it 
    and can track the fluctuation)
- Create  an Array (list) in Server Stuff (to simulate the backend) to just track price changes of all the items,
    with one unique key
- Connect that Array to a function and then use local state (because its not going to affect any other feature )
    to update the price. (Style it)
-  Create a way to be able to show if the price went up, down and shows it in price change and % change. 
*/ 
