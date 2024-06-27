import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { uploadImage, uploadVideo } from '../API/MediaHandling/ApiMediaHandling';
import { Button, Form } from 'react-bootstrap';

const UploadMedia = ({ onMediaUploaded }) => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [file, setFile] = useState(null);
    const [mediaType, setMediaType] = useState('image'); // or 'video'
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const token = await getAccessTokenSilently();
  
        let mediaResponse;
        if (mediaType === 'image') {
          mediaResponse = await uploadImage(file, user.sub, token);
        } else {
          mediaResponse = await uploadVideo(file, user.sub, token);
        }
  
        console.log('Media uploaded successfully:', mediaResponse);
  
        if (mediaResponse.id) {
          onMediaUploaded(mediaResponse.id); // Pass the media ID back to the parent component
        } else {
          console.error('Media ID not returned in response:', mediaResponse);
        }
  
      } catch (error) {
        console.error('Error uploading media:', error);
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile">
          <Form.Label>Upload {mediaType}</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
  
        <Form.Group controlId="formMediaType">
          <Form.Label>Media Type</Form.Label>
          <Form.Control
            as="select"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </Form.Control>
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Upload Media
        </Button>
      </Form>
    );
  };
  
  export default UploadMedia;
