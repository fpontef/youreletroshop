import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js';
import { listMyOrders } from '../actions/orderActions';
import formatDate from '../utils/formatDate.js';
import convertMoney from '../utils/convertMoney.js';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMyOrders = useSelector((state) => state.orderListMyOrders);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = orderListMyOrders;

  /* Observação do Basir:
   * userInfo is different from user.
   * userInfo comes from localStorage.
   * user comes from the /api/users/profile.
   * so we have to check the existence of it.
   */
  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push('/login');
  //   } else {
  //     if (!user || !user.name) {
  //       dispatch(getUserDetails('profile'));
  //       dispatch(listMyOrders());
  //     } else {
  //       setName(user.name);
  //       setEmail(user.email);
  //     }
  //   }
  // }, [dispatch, history, userInfo, user]);
  useEffect(() => {
    if (!userInfo) return history.push('/login');
    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Perfil do Usuário</h2>
        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Perfil Atualizado</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Informe o nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Informe o email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Informe a nova senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirm-password'>
            <Form.Label>Confirmação de Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirme sua nova senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Atualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Minhas Compras</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATA</th>
                <th>TOTAL</th>
                <th>PAGO</th>
                <th>ENVIO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{formatDate({ date: order.createdAt })}</td>
                  <td>{convertMoney({ value: order.totalPrice })}</td>
                  <td>
                    {order.isPaid ? (
                      formatDate({ date: order.paidAt })
                    ) : (
                      <i className='fas fa-times' styles={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      formatDate({ date: order.deliveredAt })
                    ) : (
                      <i className='fas fa-times' styles={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Mais Info
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
