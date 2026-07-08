import { useSelector } from "react-redux";
import FoodList from "../Features/foodList"
import { useState } from "react";
import CategoryFilter from "../Components/categoryFilter";



const Homepage = () => {
const foodData = useSelector(state => state.food.food);

//this is for the food filter
const[selectedCategory, setSelectedCategory] = useState("All")

const categories = ["All", ...new Set(foodData.map(item => item.category))];

const filteredFood = foodData.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
}) || [];

console.log("selected: ", selectedCategory);
console.log("Food Data: ", foodData);
console.log('Filtered: ', filteredFood);

    return(
        <div>
          <h2 className="textTop"> Food inventory </h2>
          <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}/>
          <FoodList foodData={filteredFood}/>
        </div>
    )
}
export default Homepage;