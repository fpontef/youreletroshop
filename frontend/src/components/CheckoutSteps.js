import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/cart'>
            <Nav.Link>Carrinho</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Carrinho</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Entrega</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Entrega</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Pagamento</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pagamento</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Concluir Pedido</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Concluir Pedido</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
