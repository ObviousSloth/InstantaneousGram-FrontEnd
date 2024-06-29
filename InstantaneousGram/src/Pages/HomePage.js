// Home.js

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar.js';
import SideBar from '../components/SideBar.js';
import PostList from '../components/PostList.js';
import TermsOfService from '../components/TermsOfService.js';
import '../Styling/Styling.scss';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTerms, setShowTerms] = useState(true);

  const handleButtonClick = () => {
    setShowForm(!showForm); // Toggle the state
  };

  const handleTermsAccepted = () => {
    setShowTerms(false);
  };

  return (
    <Container fluid className="vh-100">
      <TermsOfService show={showTerms} onAccept={handleTermsAccepted} />
      <SideBar />
      <Navbar />
      <Row className="h-100">
        <Col>
          EXTRA
        </Col>
        <Col xs={12} md={4} className="PostFeed h-100">
          <PostList />
        </Col>
        <Col>
          EXTRA
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
