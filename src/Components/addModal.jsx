import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../App/state/foodSlice";

//need to look and fix all of this

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
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min='0'
              required
            />
          </label>
          <label>
            category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="dry">Dry</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="frozen">Frozen</option>
            </select>
          </label>
          <label>  
            Cost:
            <input
              type="number"
              name="cost" // fix this by allowing fractional costs 
              value={formData.cost}
              onChange={handleChange}
              step='0.01'
              min='0'
              required
            /> 
          </label>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
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
