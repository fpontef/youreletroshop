import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import convertMoney from '../utils/convertMoney.js';

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 p-3 rounded'
      // style={{ minWidth: '18.75em', minHeight: '26.875em' }}
      style={{ width: '100%', height: '26.875em' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          className=''
          style={{ width: '100%', maxHeight: '250px' }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} avaliações`}
          />
        </Card.Text>

        <Card.Text as='h3'>{convertMoney({ value: product.price })}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
