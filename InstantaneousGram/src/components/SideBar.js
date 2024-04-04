import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import '../Styling/Styling.scss'; // Import your custom CSS

function SidebarExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
 <></>
  );
}

export default SidebarExample;