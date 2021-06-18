import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions.js';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js';
// Versao alternativa ao do Brad que usa querstring (exemplo:  cart?qtd=2)
import { addToCart } from '../actions/cartActions.js';
import convertMoney from '../utils/convertMoney.js';

// OBS:
// useSelector == mapStateToProps
// useDispatch == mapDispatchToProps

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      alert('Avaliação enviada!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successCreateReview]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  const addToCartHandler = () => {
    // Brad way
    //history.push(`/cart/${match.params.id}?qty=${qty}`);
    //
    // Alternativo --  também mexi no ./CartScreen.js e removi/comentei lá:
    //https://www.udemy.com/course/mern-ecommerce/learn/lecture/22494062#questions/12760999/
    dispatch(addToCart(product._id, qty));
    history.push('/cart');
  };

  return (
    <>
      <Link className='btn btn-secondary my-3' to='/'>
        Voltar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} avaliações`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Valor: {convertMoney({ value: product.price })}
                </ListGroup.Item>
                <ListGroup.Item>
                  Descrição: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Valor:</Col>
                      <Col>
                        <strong>
                          {convertMoney({ value: product.price })}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? 'Em Estoque'
                          : 'Fora de Estoque'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qtd</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Adicionar ao Carrinho
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Avaliações</h2>
              {product.reviews.length === 0 && (
                <Message>Sem avaliações no momento.</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Faça uma avaliação do produto</h2>
                  {errorCreateReview && (
                    <Message variant='danger'>{errorCreateReview}</Message>
                  )}
                  {loadingCreateReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Selecione...</option>
                          <option value='1'>1 - Ruim</option>
                          <option value='2'>2 - Regular</option>
                          <option value='3'>3 - Bom</option>
                          <option value='4'>4 - Muito Bom</option>
                          <option value='5'>5 - Excelente</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comentários</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Enviar Avaliação
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Por favor <Link to='/login'>faça o login</Link> para
                      escrever uma avaliação.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
