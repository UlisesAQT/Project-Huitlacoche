import { useState } from 'react';
import FoodCard from './Food/foodCard';
import { useSelector } from 'react-redux';
import AddFoodModal from '../Components/addModal';


const FoodList = ({foodData}) => {
    //const foodData = useSelector(state => state.food.food);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
        <button onClick={() => setModalOpen(true)}> Add Food</button>
        <div className='foodGrid'> 
            {foodData.length > 0 ? (
                foodData.map(item => (
                    <FoodCard key={item.id || item.name} food={item} />
                ))
            ) : (
                <p className="text-center">No food found. Checking the pantry...</p>
            )}
        </div>
        {modalOpen && <AddFoodModal  modalOpen={modalOpen} setModalOpen={setModalOpen} />}
         </>
    );
};
export default FoodList;

