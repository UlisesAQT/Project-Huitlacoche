import { Card, CardImg, CardText, CardBody, Col, CardImgOverlay, CardTitle} from 'reactstrap';
import { FOOD } from '../../App/testData';

const FoodCard = ({food}) => {
    const { image, name, quantity, category, cost, brand } = food;
    return (
        <Card>
            {/* <CardImg width='100%' src={image} alt={name}/>
            <CardImgOverlay>
                <CardTitle> {name} </CardTitle>
            </CardImgOverlay> */}

            <CardBody>
                <CardTitle tag='h5'> {name} </CardTitle>
                 <CardText tag='h4'> Category: {category} </CardText>
                 <CardText>  quantity: {quantity} </CardText>
                 <CardText> Cost: {cost} </CardText>
                <CardText> Brand: {brand}</CardText>
            </CardBody>
        </Card>
    );
}
export default FoodCard;