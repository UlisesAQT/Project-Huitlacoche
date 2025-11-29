import {Row, Col} from 'reactstrap';
import FoodCard from './Food/foodCard';
import {FOOD} from '../App/testData.jsx'
import FoodGrid from './Food/foodGrid'

const FoodList = () => {
    return (
        <FoodGrid foodData={ FOOD } />
    )
};
export default FoodList;

{/* <Row>
            {FOOD.map((foodItem) => (
                <Col md='4' className='mb-4' key={foodItem.id}>
                    <FoodCard food={foodItem} />
                </Col>
            ))}
        </Row> */}