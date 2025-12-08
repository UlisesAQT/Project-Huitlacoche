import React from "react";
import FoodCard from "./foodCard";
import '../../CSS/FoodGrid.css'


const FoodGrid = ({ foodData }) => {
    return (
        <div className='foodGrid'> 
            {foodData.map(food =>(
                <FoodCard key={food.id} food={food} dispatch={dispatch} />
            ))}
        </div>
    )
};
export default FoodGrid;