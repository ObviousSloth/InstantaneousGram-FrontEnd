import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import LoginButton from '../components/Login.js';
import LogoutButton from '../components/LogOut.js';
import UserProfileButton from '../components/UserProfile.js'
import Button from 'react-bootstrap/esm/Button.js';
import Container from 'react-bootstrap/esm/Container.js';
import Card from 'react-bootstrap/esm/Card.js';
import Col from 'react-bootstrap/esm/Col.js';
import Row from 'react-bootstrap/esm/Row.js';
import SideBar from '../components/SideBar.js';
import FileUploadForm from '../components/FileUploadForm.js';
import { useState } from 'react';

import '../Styling/Styling.scss';


const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm); // Toggle the state
  };
  return (

      <Container fluid className="vh-100">
          <SideBar />
       
          <Navbar />
          <Row className="h-100"> 
              <Col>
                EXTRA
              </Col>
              <Col xs={12} md={4} className="PostFeed h-100">
                POSTS
                <br />
                <Button onClick={handleButtonClick}>Toggle Form</Button>
                {showForm && <FileUploadForm />}
              </Col>
              <Col>
              EXTRA
              </Col>
          </Row>
      </Container>


  );
}

export default Home;