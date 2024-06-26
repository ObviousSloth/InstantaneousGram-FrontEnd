import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchPosts } from '../API/PostHandling/ApiPostHandling';
import { fetchMedia } from '../API/MediaHandling/ApiMediaHandling';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const PostList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await fetchPosts(token);
        
        // Fetch media URLs for each post
        const postsWithMedia = await Promise.all(data.map(async post => {
          const mediaData = await fetchMedia(post.mediaID, token);
          return { ...post, mediaURL: mediaData.url };
        }));

        setPosts(postsWithMedia);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [getAccessTokenSilently]);

  return (
    <ListGroup>
      {posts.map((post) => (
        <ListGroupItem key={post.postID}>
          <h5>{post.caption}</h5>
          <p>Posted by User ID: {post.userID}</p>
          {post.mediaURL && (
            <img src={post.mediaURL} alt="Post media" style={{ width: '100%' }} />
          )}
          <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default PostList;
