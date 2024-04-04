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
import '../Styling/Styling.scss';


function Home() {
  return (

      <Container fluid>
          <SideBar />
          <Row>
              <Col>
                EXTRA
              </Col>
              <Col className="PostFeed">
                POSTS
              </Col>
              <Col>
              EXTRA
              </Col>
          </Row>
      </Container>


  );
}

export default Home;