import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL; // Replace with your backend API URL

const apiClient = axios.create({
  baseURL: `${BASE_URL}/imageandvideoprocessing/api`,
});

export const uploadImage = async (file, userId, token) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
  
    try {
      const response = await apiClient.post('/imageandvideo/upload/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  export const uploadVideo = async (file, userId, token) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
  
    try {
      const response = await apiClient.post('/imageandvideo/upload/video', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  };

export const fetchMedia = async (mediaId, token) => {
  try {
    const response = await apiClient.get(`/imageandvideo/get/${mediaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};
