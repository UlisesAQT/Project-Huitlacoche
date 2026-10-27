import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../App/state/foodSlice";
import { UNITS } from "./units";


const AddFoodModal = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: "",
    quantity: '',
    cost: '',
    brand: "",
    category: "dry",
    unit: "units",
    storageDate: "",
  };

  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    name: "",
    quantity: '',
    cost: '',
    brand: "",
    category: "dry",
    unit: "units",
    storageDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name === '') {
      setFormError('Name is required')
      return
    }
    if(formData.quantity <= 0){ 
      setFormError('Quantity must be at least 1')
      return
    }
    if(formData.cost <= 0){
      setFormError('Cost must be greater than 0')
      return
    }


    setFormError('')
    dispatch(addFood(formData));
    setFormData(initialFormState);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setModalOpen(false)
  };

  return (
 
 <div className="custom-overlay">
    <div className="custom-modal">
      <h2>Add Food</h2>
      {formError && <div className="error">{formError}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>Quantity:
          <input name="quantity" type="number" min="0" step ="0.01" value={formData.quantity} onChange={handleChange} />
        </label>
        <label>Unit:
          <select name="unit" value={formData.unit} onChange={handleChange}>
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </label>
        <label>Cost:
          <input name="cost" type="number" min="0" step ="0.01" value={formData.cost} onChange={handleChange} />
        </label>
        <label>Brand:
          <input name="brand" value={formData.brand} onChange={handleChange} />
        </label>
        <label>Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="dry">Dry</option>
            <option value="refrigerated">Refrigerated</option>
            <option value="frozen">Frozen</option>
            <option value="beverage">Beverage</option>
            <option value="alcohol">Alcohol</option>
            <option value="paper goods">Paper Goods</option>
            <option value="janitorial">Janitorial</option>
          </select>
        </label>
        {(formData.category === "frozen" || formData.category === "refrigerated") && (
          <label>
            {formData.category === "frozen" ? "Frozen Since:" : "Refrigerated Since:"}
            <input 
            name="storageDate"
            type="date"
            value={formData.storageDate}
            onChange={handleChange}
            />
          </label>
        )}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  </div>

  
  );
};

export default AddFoodModal;
