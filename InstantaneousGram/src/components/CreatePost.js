import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createPost } from '../API/PostHandling/ApiPostHandling';
import { Button, Form } from 'react-bootstrap';

const CreatePost = ({ mediaId }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaId) {
      console.error('Media ID is required to create a post.');
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      const postData = {
        postID: 0, // Backend auto-increments this field
        userID: user.sub, // Send the user ID as a string
        mediaID: mediaId, // Use the media ID as a string
        caption: caption,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Creating post with data:', postData); // Add this line for debugging

      await createPost(postData, token);

      // Reset form
      setCaption('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCaption">
        <Form.Label>Caption</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Post
      </Button>
    </Form>
  );
};

export default CreatePost;
