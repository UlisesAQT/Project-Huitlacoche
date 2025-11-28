import {Row, Col} from 'reactstrap';
import FoodCard from './Food/foodCard';
import {FOOD} from '../App/testData.jsx'

const FoodList = () => {
    return (
        <Row>
            {FOOD.map((foodItem) => (
                <Col md='4' className='mb-4' key={foodItem.id}>
                    <FoodCard food={foodItem} />
                </Col>
            ))}
        </Row>
    )
};
export default FoodList;