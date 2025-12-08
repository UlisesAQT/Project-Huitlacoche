import FoodCard from './Food/foodCard';
import {FOOD} from '../App/testData.jsx'
import FoodGrid from './Food/foodGrid'
import { useSelector } from 'react-redux';

const FoodList = () => {
    const foodData = useSelector(state => state.inventory);

    return (
        <div className='foodGrid'>
            {foodData.map(item => (
                <FoodCard key={item.id} food={item}  />
            ))}
        </div>
    );
};
export default FoodList;

