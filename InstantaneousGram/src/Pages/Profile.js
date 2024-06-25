import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserProfileByAuthId, updateUserProfile, deleteUserProfile } from '../API/Users/ApiUserProfileHandling.js';
import Navbar from '../components/Navbar.js';
import SideBar from '../components/SideBar.js';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import '../Styling/Styling.scss';
import '../Styling/Style.css';

const ProfilePage = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const userProfile = await getUserProfileByAuthId(user.sub);
          console.log(userProfile);
          setBio(userProfile.bio);
          setUsername(userProfile.username);
          setEmail(userProfile.email);
          setProfilePictureURL(userProfile.profilePictureURL);
          setCreatedAt(userProfile.createdAt);
          setUpdatedAt(userProfile.updatedAt);
          setUserData(userProfile.profilePictureURL);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, user]);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the input fields when modal is closed
    setNewBio('');
    setNewUsername('');
    setNewEmail('');
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUserProfile = {
        userID: 0, // This value should be correctly set if necessary
        auth0Id: user.sub,
        bio: newBio || bio,
        username: newUsername || username,
        email: newEmail || email,
        profilePictureURL: profilePictureURL,
        createdAt: createdAt,
        updatedAt: new Date().toISOString(), // Update to current date
      };

      await updateUserProfile(user.sub, updatedUserProfile);
      console.log('User updated successfully.');

      // Re-fetch the user profile to ensure UI is up-to-date
      const userProfile = await getUserProfileByAuthId(user.sub);
      setBio(userProfile.bio);
      setUsername(userProfile.username);
      setEmail(userProfile.email);
      setProfilePictureURL(userProfile.profilePictureURL);
      setCreatedAt(userProfile.createdAt);
      setUpdatedAt(userProfile.updatedAt);
      setUserData(userProfile.profilePictureURL);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      // Fetch the user profile by authId
      const userProfile = await getUserProfileByAuthId(user.sub);
      if (userProfile && userProfile.userID) {
        // Delete the user profile by userID
        await deleteUserProfile(userProfile.userID);
        console.log('User deleted successfully.');
        // Optionally, redirect or clear state
      } else {
        console.error('User profile not found or missing userID.');
      }
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <h2>{username}</h2>
          <p>{email}</p>
          {isAuthenticated && (
            <Button variant="primary" onClick={handleEditProfile}>
              <i className="fas fa-pencil-alt"></i> Edit Profile
            </Button>
          )}
          <h1>Bio</h1>
          <p>{bio}</p>
          {isAuthenticated && (
            <Button variant="danger" onClick={handleDeleteProfile}>
              <i className="fas fa-trash-alt"></i> Delete Profile
            </Button>
          )}
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
          <br />
          <label htmlFor="newEmail">New Email:</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
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
};

export default ProfilePage;
