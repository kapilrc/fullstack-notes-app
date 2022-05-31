import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid="md">
        <Navbar.Brand>
        <Link to="/">Notes App</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className='m-auto'>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/my-notes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Kapil" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/profile')}>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header