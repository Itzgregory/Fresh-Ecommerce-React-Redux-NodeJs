import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartWidget } from '../';
import logo from '../../../assets/images/logo.jpg';
import { LogUser } from '../../index';
import MediaQuery from 'react-responsive';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const NavBar = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const user = useSelector(state => state.user?.User) || {};
  const cartList = useSelector(state => state.cart?.products) || [];

  const menuItems = [
    { path: '/', label: 'Products' },
    user?.username && { path: '/orders', label: 'My orders' },
  ].filter(Boolean);

  const categoryItems = [
    { path: '/category/Ornament', label: 'Ornaments' },
    { path: '/category/Kitchen', label: 'Kitchen' },
    { path: '/category/Food', label: 'Food' },
    { path: '/category/Drink', label: 'Drink' },
    { path: '/category/Dessert', label: 'Desserts' },
  ];

  return (
    <>
      <Navbar id='navBar' variant="dark" expand="lg">
        <MediaQuery minWidth={991}>
          <Container>
            <Link to={'/'} id="brandNav">
              <img alt="" id="brand" src={logo} />Japoneando
            </Link>
            <Nav id='menuContainer'>
              {user?.admin && (
                <Link to={'/admin'} className='selected'>Admin Panel</Link>
              )}
              {menuItems.map(item => (
                <Link key={item.path} to={item.path} className='selected'>
                  {item.label}
                </Link>
              ))}
              <NavDropdown className='selector' title="Categories" id="basic-nav-dropdown">
                {categoryItems.map(item => (
                  <NavDropdown.Item key={item.path} as={Link} to={item.path}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Container>
          {cartList.length > 0 && (
            <div className='countCart'>
              {cartList.reduce((acumQty, { Qty }) => acumQty + Qty, 0)}
            </div>
          )}
          <div id='cartShop'>
            <Link to={'/cart'}><CartWidget /></Link>
          </div>
          <div className="loguser-container">
            <LogUser User={user} />
            <div className="dropdown-links">
              {!user?.username && (
                <>
                  <Link to="/login" className="dropdown-item">Login</Link>
                  <Link to="/signup" className="dropdown-item">Register</Link>
                </>
              )}
            </div>
          </div>
        </MediaQuery>

        <MediaQuery maxWidth={990}>
          <Container fluid>
            <Link to={'/'} id="brandNav">
              <img alt="" id="brand" src={logo} />Japoneando
            </Link>
            <div className='menu-icon' onClick={() => setSideMenuOpen(true)}>&#9776;</div>
          </Container>
          
          <div className={`side-menu ${sideMenuOpen ? 'open' : ''}`}>
            <button className='close-btn' onClick={() => setSideMenuOpen(false)}>&times;</button>
            <div className='userCartContainer'>
              {cartList.length > 0 && (
                <div className='countCart'>
                  {cartList.reduce((acumQty, { Qty }) => acumQty + Qty, 0)}
                </div>
              )}
              <Link to={'/cart'} className='selected' onClick={() => setSideMenuOpen(false)}>
                <CartWidget />
              </Link>
              <LogUser User={user} />
            </div>
            <div className='menu-items'>
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className='selected menu-item'
                  onClick={() => setSideMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="category-items">
                {categoryItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className='selected menu-item'
                    onClick={() => setSideMenuOpen(false)}
                    style={{ animationDelay: `${(menuItems.length + index) * 0.1}s` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {!user?.username && (
                <div className="auth-links">
                  <Link to="/login" className="selected menu-item login-register-btn" onClick={() => setSideMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="selected menu-item login-register-btn" onClick={() => setSideMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </MediaQuery>
      </Navbar>
    </>
  );
};
