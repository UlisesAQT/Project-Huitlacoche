import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../App/state/foodSlice";



const AddFoodModal = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: "",
    quantity: '',
    cost: '',
    brand: "",
    category: "dry",
  };

  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    name: "",
    quantity: '',
    cost: '',
    brand: "",
    category: "dry",
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
    <Modal isOpen={modalOpen} aria-labelledby="modal-title">
      <ModalHeader id="modal-title" component="h1">
        New Food
      </ModalHeader>
      <ModalBody>
        {formError && <div className="error-message">{formError}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span className="label-text">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-field">
             <span className="label-text">Quantity:</span> 
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-input"
              min='0'
              required
            />
          </label>
          <label className="form-field">
              <span className="label-text">Category:</span>  
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="dry">Dry</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="frozen">Frozen</option>
              <option value="beverage">Beverage</option>
              <option value="alcohol">Alcohol</option>
              <option value="paper goods">Paper Goods</option>
              <option value="janitorial">Janitorial</option>
            </select>
          </label>
          <label className="form-field">  
             <span className="label-text">Cost:</span>
            <input
              type="number"
              name="cost" 
              value={formData.cost}
              onChange={handleChange}
              className="form-input"
              step='0.01'
              min='0'
              required
            /> 
          </label>
          <label className="form-field">
            <span className="label-text">Brand:</span> 
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </ModalBody>

      <ModalFooter>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFoodModal;
