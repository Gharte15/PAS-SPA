import React from 'react';
import { NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Link } from 'react-router-dom';
import authService from '../../services/auth.service';


const HotelNavbar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Hotel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {authService.getUserRole() !== 'NONE' &&
            <>
              <NavDropdown title="Rooms" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/rooms">Show all rooms</NavDropdown.Item>
                {(authService.getUserRole() === 'ADMIN' || authService.getUserRole() === 'MANAGER') &&
                <>
                  <NavDropdown.Item href="#action4">Add room</NavDropdown.Item>
                </>
                }
              </NavDropdown>
              {(authService.getUserRole() === 'ADMIN' || authService.getUserRole() === 'MANAGER') &&
              <>
                <NavDropdown title="Users" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action5">Show all users</NavDropdown.Item>
                  <NavDropdown.Item href="#action6">Show all clients</NavDropdown.Item>
                </NavDropdown>
              </>
              }
              <NavDropdown title="Rents" id="navbarScrollingDropdown">
              {authService.getUserRole() !== 'NONE' &&
                <>
                  <NavDropdown.Item as={Link} to="/addRent">Rent a room</NavDropdown.Item>
                </>
              }
              {(authService.getUserRole() === 'ADMIN' || authService.getUserRole() === 'MANAGER') &&
              <>
                <NavDropdown.Item href="#action8">Show all rents</NavDropdown.Item>
              </>
              }
              </NavDropdown>
            </>
            }
          </Nav>
          <Navbar.Brand>Your role is: {authService.getUserRole()}</Navbar.Brand>
          <Form className="d-flex">
            <Link to="/changePassword">
              <Button className="mx-1" variant="success" >Change password</Button>
            </Link>
            {authService.getUserRole() === 'NONE' &&
            <>
              <Link to="/login">
                <Button className="mx-1" variant="success">Login</Button>
              </Link>
            </>
            }
            {authService.getUserRole() !== 'NONE' &&
            <>
            <Link to="/">
              <Button className="mx-1" variant="success" onClick={() => authService.logout()}>Logout</Button>
            </Link>
            </>
            }
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HotelNavbar;