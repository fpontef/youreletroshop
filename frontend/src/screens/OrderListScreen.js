import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listOrders } from '../actions/orderActions';
import convertMoney from '../utils/convertMoney.js';
import formatDate from '../utils/formatDate.js';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Ordens de Compras</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USUÁRIO</th>
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
                <td>{order.user && order.user.name}</td>
                <td>{formatDate({ date: order.createdAt })}</td>
                <td>
                  {convertMoney({
                    value: order.totalPrice,
                  })}
                </td>
                <td>
                  {' '}
                  {order.isPaid ? (
                    formatDate({ date: order.paidAt })
                  ) : (
                    <i
                      className='fas fa-times'
                      style={{
                        color: 'red',
                      }}
                    ></i>
                  )}
                </td>
                <td>
                  {' '}
                  {order.isDelivered ? (
                    formatDate({ date: order.deliveredAt })
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>{' '}
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='secondary' className='btn-sm'>
                      Mais Info
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
