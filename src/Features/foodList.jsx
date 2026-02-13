import { useState } from 'react';
import FoodCard from './Food/foodCard';
import { useSelector } from 'react-redux';


const FoodList = () => {
    const foodData = useSelector(state => state.food.food);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
        <button onClick={() => setModalOpen(true)}> Add Food</button>
        <div className='foodGrid'> 
            {foodData.length > 0 ? (
                foodData.map(item => (
                    <FoodCard key={item.id} food={item} />
                ))
            ) : (
                <p className="text-center">No food found. Checking the pantry...</p>
            )}
        </div>
        {modalOpen && <AddFoodModal  onClose= {() => setModalOpen(false)} />}
         </>
    );
};
export default FoodList;

