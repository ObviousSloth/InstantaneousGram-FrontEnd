import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogout } from './LogOut';
import { useLogIn } from './Login';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkUserExists } from '../API/Users/ApiUserHandling';
import { useAuth0 } from '@auth0/auth0-react';


function NavBar() {
  const logoutUser = useLogout();
  const loginUser = useLogIn();
  const [userExists, setUserExists] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
   
      try {
        setUserExists(isAuthenticated);
      } catch (error) {
        console.error('Error checking user:', error);
      };
    

  },);

  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navbar.Brand href="/">InstantaneousGram</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Likes">Likes</Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
            {userExists ? (
                // Render logout option if the user exists
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              ) : (
                // Render login or registration option if the user doesn't exist
                <>
                  <NavDropdown.Item onClick={loginUser}>Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              
              <NavDropdown.Item >
                Delete Account
                
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex justify-content-center">
          <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavBar;