import React, { useEffect, useState } from 'react';
import { NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Link } from 'react-router-dom';
import { authService } from '../../services/auth/auth.service';


const HotelNavbar = () => {
  const [currentRole, setCurrentRole] = useState<string>()
  const [login, setLogin] = useState<any>();

  useEffect(() => {
    authService.currentRole.subscribe((value) => setCurrentRole(value))
  });

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
            {currentRole !== 'NONE' &&
              <>
                <NavDropdown title="Rooms" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/rooms">Show all rooms</NavDropdown.Item>
                  {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
                    <>
                      <NavDropdown.Item href="#action4">Add room</NavDropdown.Item>
                    </>
                  }
                </NavDropdown>
                {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
                  <>
                    <NavDropdown title="Users" id="navbarScrollingDropdown">
                      <NavDropdown.Item as={Link} to="/users">Show all users</NavDropdown.Item>
                    </NavDropdown>
                  </>
                }
                <NavDropdown title="Rents" id="navbarScrollingDropdown">
                  {currentRole !== 'NONE' &&
                    <>
                      <NavDropdown.Item as={Link} to="/addRent">Rent a room</NavDropdown.Item>
                    </>
                  }
                  {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
                    <>
                      <NavDropdown.Item href="#action8">Show all rents</NavDropdown.Item>
                    </>
                  }
                </NavDropdown>
              </>
            }
          </Nav>
          <Navbar.Brand>Your role is: { currentRole } </Navbar.Brand>
          <Form className="d-flex">
            {currentRole !== 'NONE' && <>
              <Link to="/changePassword">
                <Button className="mx-1" variant="success" >Change password</Button>
              </Link>
            </>
            }
            {currentRole === 'NONE' &&
              <>
                <Link to="/login">
                  <Button className="mx-1" variant="success">Login</Button>
                </Link>
              </>
            }
            {currentRole !== 'NONE' &&
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