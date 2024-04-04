import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import '../Styling/Styling.scss'; // Import your custom CSS

function SidebarExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show Sidebar
      </Button>

      <div className={`sidebar ${show ? 'show' : ''}`} onClick={handleClose}>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Another Link</Nav.Link>
        </Nav>
      </div>
    </>
  );
}

export default SidebarExample;