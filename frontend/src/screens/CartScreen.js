// Brad version
//import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import convertMoney from '../utils/convertMoney.js';

const CartScreen = ({ match, location, history }) => {
  // "Brad way" ver explicações abaixo, no useEffect:
  /*
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  */
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Brad way, de acordo com os comentários do curso, usando addToCart direto na
  // tela de produto é melhor, pois ao dar F5 na tela do carrinho, a qty volta
  // pois é "hard coded" na barra de endereços
  /*
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const subTotalItems =
    cartItems && cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Row>
      <Col md={8}>
        <h1>Carrinho de Compras</h1>
        {cartItems.length === 0 ? (
          <Message>
            Seu carrinho está vazio! <Link to='/'>Voltar</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{convertMoney({ value: item.price })}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({subTotalItems}){' '}
              {subTotalItems === 1 ? 'item' : 'itens'}
            </h2>

            {convertMoney({
              value: cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2),
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Prosseguir para Compra
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
