import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_DOCKER_URL; // Replace with your backend API URL

const apiClient = axios.create({
  baseURL: `${BASE_URL}3/contentmanagement/api`,
});

export const createPost = async (postData, token) => {
    try {
      const response = await apiClient.post('/contentmanagement', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  
  export const fetchPosts = async (token) => {
    try {
      const response = await apiClient.get('/contentmanagement', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };
  
  export const fetchPostById = async (id, token) => {
    try {
      const response = await apiClient.get(`/contentmanagement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw error;
    }
  };
  
  export const updatePost = async (id, postData, token) => {
    try {
      await apiClient.put(`/contentmanagement/${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
      });
    } catch (error) {
      console.error(`Error updating post with id ${id}:`, error);
      throw error;
    }
  };
  
  export const deletePost = async (id, token) => {
    try {
      await apiClient.delete(`/contentmanagement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting post with id ${id}:`, error);
      throw error;
    }
  };