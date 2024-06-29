// TermsOfService.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TermsOfService = ({ show, onAccept }) => {
  const [terms, setTerms] = useState({
    profiles: false,
    media: false,
    posts: false,
    likesComments: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setTerms((prevTerms) => ({
      ...prevTerms,
      [name]: checked,
    }));
  };

  const handleAcceptAll = () => {
    const updatedTerms = {
      profiles: true,
      media: true,
      posts: true,
      likesComments: true,
    };
    setTerms(updatedTerms);
    localStorage.setItem('termsAccepted', JSON.stringify(updatedTerms));
    onAccept();
  };

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', JSON.stringify(terms));
    onAccept();
  };

  useEffect(() => {
    const savedTerms = JSON.parse(localStorage.getItem('termsAccepted'));
    if (savedTerms && savedTerms.profiles && savedTerms.media && savedTerms.posts && savedTerms.likesComments) {
      onAccept();
    }
  }, [onAccept]);

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Terms of Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="checkbox"
            label="I accept the terms for creating profiles"
            name="profiles"
            checked={terms.profiles}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="I accept the terms for uploading media"
            name="media"
            checked={terms.media}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="I accept the terms for creating posts"
            name="posts"
            checked={terms.posts}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="I accept the terms for likes and comments"
            name="likesComments"
            checked={terms.likesComments}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAcceptAll}>
          Accept All
        </Button>
        <Button
          variant="primary"
          onClick={handleAccept}
          disabled={!terms.profiles || !terms.media || !terms.posts || !terms.likesComments}
        >
          Accept Selected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsOfService;
