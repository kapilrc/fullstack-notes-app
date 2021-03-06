import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { logout } from '../../actions/userActions';
import { changeTheme } from '../../actions/themeAction';

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  const theme = useSelector(state => state.theme);

  const switchTheme = (theme) => {
    // console.log(theme);
    dispatch(changeTheme(theme));
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid="md">
        <Navbar.Brand>
        <Link to="/">Notes App</Link></Navbar.Brand>

        <NavDropdown title={`Theme  - ${theme}`} id="basic-nav-dropdown">
          <NavDropdown.Item className={theme === 'Sketchy' ? 'active': ''} onClick={() => switchTheme('Sketchy')}>
            Sketchy
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className={theme === 'Yeti' ? 'active': ''} onClick={() => switchTheme('Yeti')}>Yeti</NavDropdown.Item>
        </NavDropdown>

        {
          userInfo ? (
            <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className='m-auto'>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={ (e) => setSearch(e.target.value) }
                  />
                </Form>
              </Nav>
              <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Link className='nav-link' to="/my-notes">My Notes</Link>
                <NavDropdown title={userInfo?.name || "Hi"} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => navigate('/profile')}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            </>
          ) : (
            <Nav className=''>
              <Link className='nav-link' to="/login">Login</Link>
            </Nav>
          )
        }
      </Container>
    </Navbar>
  )
}

export default Header