import axios from 'axios';


const BASE_URL = process.env.REACT_APP_BACKEND_DOCKER_URL;

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image); // Use 'image' instead of 'file'

    const response = await axios.post(`${BASE_URL}2/api/Upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error uploading image');
  }
};

const uploadVideo = async (video) => {
  try {
    const formData = new FormData();
    formData.append('video', video); // Use 'video' instead of 'file'

    const response = await axios.post(`${BASE_URL}2/api/Upload/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error uploading video');
  }
};

export { uploadImage, uploadVideo };

