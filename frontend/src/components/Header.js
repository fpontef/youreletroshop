import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions.js';
import SearchBox from './SearchBox.js';

// Abaixo é necessário só na versão com withRouter (HoC) e não na c/ hooks.
//const Header = ({ history }) => {
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Jeito com useHistory é o melhor e vou manter.
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    // Jeito com "withRouter" do react-router-dom + HoC no Header.
    // Ou pode optar pelo useHistory numa abordagem com hooks.
    history.push('/login');
    // Jeito do Basir, mas a diferença que ele incluiu nos actions
    // ao invés da Header
    //document.location.href = '/login';
  };

  // CSS Boostrap Theme: https://bootswatch.com/cerulean/
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>[ Seu EletroShop ]</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox history={history} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Carrinho
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Perfil do Usuário</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sair
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Usuários</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Produtos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

// Jeito com withRouter como HoC pra liberar o history.push
//export default withRouter(Header);
export default Header;
