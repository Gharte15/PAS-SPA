import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Link } from 'react-router-dom';


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
            <NavDropdown title="Rooms" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/rooms">Show all rooms</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Add room</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Users" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action5">Show all users</NavDropdown.Item>
              <NavDropdown.Item href="#action6">Show all clients</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Rents" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action7">Rent a room</NavDropdown.Item>
              <NavDropdown.Item href="#action8">Show all rents</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Button className="mx-1" variant="success">Register</Button>
            <Button className="mx-1" variant="success">Login</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HotelNavbar;