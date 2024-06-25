import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import { useLogout } from './LogOut';
import { useLogIn } from './Login';
import { useRegister } from './Registration';  // Import the useRegister hook
import {  deleteUserProfile, getUserProfileByAuthId } from '../API/Users/ApiUserProfileHandling';
import { checkUserExists } from '../API/Users/ApiUserHandling';
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
  const logoutUser = useLogout();
  const loginUser = useLogIn();
  const registerUser = useRegister();  // Initialize the useRegister hook
  const [userExists, setUserExists] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const exists = await checkUserExists(user.sub);
          setUserExists(exists);
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user]);

  const handleDeleteAccount = async () => {
    if (isAuthenticated && user) {
      try {
        const userProfile = await getUserProfileByAuthId(user.sub);
        if (userProfile && userProfile.userID) {
          await deleteUserProfile(userProfile.userID);
          setUserExists(false);
          logoutUser();
        } else {
          console.error('User profile not found or missing userID.');
        }
      } catch (error) {
        console.error('Error deleting user profile:', error);
      }
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navbar.Brand href="/">InstantaneousGram</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Likes">Likes</Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              {isAuthenticated ? (
                <>
                  <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleDeleteAccount}>Delete Account</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={loginUser}>Login</NavDropdown.Item>
                  <NavDropdown.Item onClick={registerUser}>Register</NavDropdown.Item>  {/* Add Register option */}
                </>
              )}
              <NavDropdown.Divider />
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
