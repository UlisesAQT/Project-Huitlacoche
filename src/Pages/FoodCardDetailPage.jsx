import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FoodCardDetail = () => {
  const { foodCardId } = useParams();
  const products = useSelector((state) => state.food.food) || [];

  const food = products.find((item) => item.id === foodCardId);

  console.log("param", foodCardId);
  console.log("products", products);

  if (!products.length) return <h2 className="loading">Loading...</h2>;

  if (!food) return <h2>Food item not found</h2>;
  return <DetailModal food={food} />;
};

const DetailModal = ({ food }) => {
  const { name, quantity, category, cost, brand } = food;

  return (
    <div className="detail-modal">
      <h3 className="food-name ms-5">{name}</h3>
      <p>
        {" "}
        <strong>Category:</strong> {category}{" "}
      </p>
      <p>
        {" "}
        <strong>Brand:</strong> {brand}{" "}
      </p>
      <p>
        {" "}
        <strong>Cost:</strong> {cost}{" "}
      </p>
      <p>
        {" "}
        <strong>Quantity:</strong> {quantity}{" "}
      </p>
    </div>
  );
};
export default FoodCardDetail;


/* IN ORDER TO BUILD THE PRICE CHANGE CHART: 
- Build an edit feature (so every time the price changes, it pushes it 
    and can track the fluctuation)
- Create  an Array (list) in Server Stuff (to simulate the backend) to just track price changes of all the items,
    with one unique key
- Connect that Array to a function and then use local state (because its not going to affect any other feature )
    to update the price. (Style it)
-  Create a way to be able to show if the price went up, down and shows it in price change and % change. 
*/ 
