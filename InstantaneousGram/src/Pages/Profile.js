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
import { useAuthToken } from '../components/Auth.js';
import  MyComponent from '../components/testApi.js';
import '../Styling/Styling.scss';



function Profile() {
useAuthToken();
  return (

      <Container fluid className="vh-100">
          <SideBar />
       
          <Navbar />
          <Row className="h-100"> 
              <Col>
                EXTRA
                <MyComponent/>
              </Col>
              <Col xs={12} md={4} className="PostFeed h-100">
                POSTS
              </Col>
              <Col>
              <UserProfile/>
              </Col>
          </Row>
      </Container>


  );
}

export default Profile;