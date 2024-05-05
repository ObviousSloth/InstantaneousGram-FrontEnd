import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import LoginButton from '../components/Login.js';
import LogoutButton from '../components/LogOut.js';
import UserProfile from '../components/UserProfile.js'
import Button from 'react-bootstrap/esm/Button.js';
import Container from 'react-bootstrap/esm/Container.js';
import Card from 'react-bootstrap/esm/Card.js';
import Col from 'react-bootstrap/esm/Col.js';
import Row from 'react-bootstrap/esm/Row.js';
import SideBar from '../components/SideBar.js';
import {getUsers, getUserByAuthId} from '../API/Users/ApiUserHandling.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import { updateUserBio } from '../API/Users/ApiUserHandling.js';
import '../Styling/Styling.scss';
import '../Styling/Style.css';



function Profile() {
 // const [users, setUsers] = useState([]);
  const [bio, setBio] = useState('');
  const { isAuthenticated, user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the input fields when modal is closed
    setNewBio('');
    setNewUsername('');
  };

  const handleSaveChanges = async () => {
    try {
      // Update the user's bio and username
      await updateUserBio(user.sub, { id:0, bio: newBio, username: newUsername, profile_Picture: 's'});
      console.log('User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
    }

    // Close the modal
    handleCloseModal();
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const User = await getUserByAuthId(user.sub); // Pass user.sub (authId) to fetch user bio
          console.log(User);
          setBio(User.bio);
          setUserData(User.profile_Picture);
          console.log("PP "+User.profile_Picture);
        } catch (error) {
          console.error('Error fetching user bio:', error);
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, user]);

  return (
    <Container fluid className="vh-100">
      <SideBar />
      <Navbar />
      <Row className="h-100">
        <Col>EXTRA</Col>
        <Col xs={12} md={4} className="PostFeed h-100">
          POSTS
        </Col>
        <Col>
        <br />
        {userData && (
        <img className='ProfilePic' src={userData} alt="Profile Picture" />
           )}
          <UserProfile />
        
           <br />
          {isAuthenticated && (
            <Button variant="primary" onClick={handleEditProfile}>
              <i className="fas fa-pencil-alt"></i> Edit Profile
            </Button>
          )}
          <h1>Bio</h1>
          <p>{bio}</p>
        </Col>
      </Row>
      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="newBio">New Bio:</label>
          <input
            type="text"
            id="newBio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <br />
          <label htmlFor="newUsername">New Username:</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;