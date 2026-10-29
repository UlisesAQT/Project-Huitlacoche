import { useEffect, useState } from 'react';
import FoodCard from './Food/foodCard';
import { useSelector, useDispatch } from 'react-redux';
import AddFoodModal from '../Components/addModal';
import { updateFood, removeFood } from '../App/state/foodSlice';





const FoodList = ({foodData}) => {
    const [modalOpen, setModalOpen] = useState(false);
// this is state to turn the edit mode on and off
    const [editMode, setEditMode] = useState(false);
    //this makes a copy of the inventory and when finished it compares it and adjusts accordingly
    const [tempInventory, setTempInventory] = useState(foodData);
    const dispatch = useDispatch();

    useEffect(() => {
        setTempInventory(foodData)
    }, [foodData]);

    const handleEditMode = () => {
        setEditMode(true)
        setTempInventory(foodData)
    };
    const handleCancel = () => {
        setTempInventory(foodData)
        setEditMode(false)
    };
    const handleSave = () => {
        // put every id we kept into a Set, so checking "was this kept?" is O(1) instead of searching the whole list
        const keptIds = new Set(tempInventory.map(item => item.id));

        // anything in the real list that isn't in the kept list was deleted, so tell the server
        foodData.forEach(item => {
            if (!keptIds.has(item.id)) {
                dispatch(removeFood(item.id));
            }
        });

        tempInventory.forEach(item => {
            dispatch(updateFood(item))
        });
        setEditMode(false);
    }
    const handleDelete = (id) => {
        setTempInventory(tempInventory.filter(item => item.id !== id ))
    }
    const handleUpdate = (updatedFood) => {
        setTempInventory(tempInventory.map(item => 
            item.id === updatedFood.id ? updatedFood : item
        ));
    };



    return (
        <>
     <div className='toolbar'>
        <button  onClick={() => { console.log("ADD CLICKED");setModalOpen(true)} }> 
            + Add Food
        </button>
        {!editMode ? (
            <button  onClick={handleEditMode}>
                Edit Inv
            </button>
        ): (
            <div className='toolbarGroup'>
                <button  onClick={handleSave}>
                    Save Changes
                </button>

                <button  onClick={handleCancel}>
                    Cancel
                </button>

            </div>
        )}
    </div>



        <div className='foodGrid'> 
            {tempInventory.length > 0 ? (
                tempInventory.map(item => (
                    <FoodCard key={item.id || item.name} food={item} edit={editMode} onDelete={handleDelete} onSave={handleSave} onCancel={handleCancel} onUpdate={handleUpdate} />
                ))
            ) : (
                <p className="text-center">No food found. Checking the pantry...</p>
            )}
        </div>
        {console.log('rendering modal:', modalOpen)}
        {modalOpen && <AddFoodModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
         </>
    );
};
export default FoodList;

