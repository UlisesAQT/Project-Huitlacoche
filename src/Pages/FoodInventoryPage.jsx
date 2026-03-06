import { useSelector } from "react-redux";
import FoodList from "../Features/foodList"



const Homepage = () => {
const foodData = useSelector(state => state.food.food);

    return(
        <div className="mt-4">
          <h2 className="text-center mt-1 mb-3"> Food inventory </h2>
          <FoodList foodData={foodData}/>
        </div>
    )
}
export default Homepage;