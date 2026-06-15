import { useEffect, useState } from 'react';
import FoodCard from './Food/foodCard';
import { useSelector } from 'react-redux';
import AddFoodModal from '../Components/addModal';





const FoodList = ({foodData}) => {
    const [modalOpen, setModalOpen] = useState(false);
// this is state to turn the edit mode on and off
    const [editMode, setEditMode] = useState(false);
    //this makes a copy of the inventory and when finished it compares it and adjusts accordingly
    const [tempInventory, setTempInventory] = useState(foodData);

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
        setEditMode(false) // i have to write the push for this 
    }
    const handleDelete = (id) => {
        setTempInventory(tempInventory.filter(item => item.id != id ))
    }



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


        {/* {!editMode && <button onClick={handleEditMode}>Edit </button>}
        {editMode && <button onClick={handleSave}>Save</button>}
        {editMode && <button onClick={handleCancel}>Cancel</button>}  */}

        <div className='foodGrid'> 
            {tempInventory.length > 0 ? (
                tempInventory.map(item => (
                    <FoodCard key={item.id || item.name} food={item} edit={editMode} onDelete={handleDelete} />
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

