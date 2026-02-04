//import { Card, CardImg, CardText, CardBody, Col, CardImgOverlay, CardTitle} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { fetchFood } from '../../App/state/foodSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Button } from 'reactstrap';

const FoodCard = ({food}) => {
    const { name, quantity, category, cost, brand } = food;
    const dispatch = useDispatch();
    
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


    return (
    <div className='food_item'>
        <div className='food-info'>
           <h3 className='food-name ms-5'>{name}</h3> 
           <p><strong>Category:</strong> {category}</p>
           <p><strong>Cost:</strong> {cost}</p>
           <p><strong>Brand:</strong> {brand}</p>
           <p className='ms-4'> <button> -</button>  <strong> Quantity:</strong>  {quantity} <button>+</button></p>
           
        </div>
        
    </div>
    );
}
export default FoodCard;