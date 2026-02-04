import FoodCard from './Food/foodCard';
import { useSelector } from 'react-redux';

const FoodList = () => {
    const foodData = useSelector(state => state.food.food);

    return (
        <div className='foodGrid'>
            {foodData.length > 0 ? (
                foodData.map(item => (
                    <FoodCard key={item.id} food={item} />
                ))
            ) : (
                <p className="text-center">No food found. Checking the pantry...</p>
            )}
        </div>
    );
};
export default FoodList;

