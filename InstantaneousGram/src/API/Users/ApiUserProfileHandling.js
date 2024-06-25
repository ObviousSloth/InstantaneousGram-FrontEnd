// src/services/apiService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_DOCKER_URL || 'http://localhost:5500';
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN; // Add your Auth0 domain here
const AUTH0_MANAGEMENT_API_TOKEN = process.env.REACT_APP_AUTH0_MANAGEMENT_API_TOKEN; // Add your Auth0 Management API token here

const apiClient = axios.create({
  baseURL: `${BASE_URL}0/userprofile/api`, // Adjust the base URL as per your setup
});

apiClient.defaults.headers.post['Content-Type'] = 'application/json';
apiClient.defaults.headers.put['Content-Type'] = 'application/json';

export const getUserProfileByAuthId = async (authId) => {
  try {
    const response = await apiClient.get(`/Profile/auth/${authId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile by Auth ID', error);
    throw error;
  }
};

export const updateUserProfile = async (authId, userProfile) => {
  try {
    console.log(`Updating user profile for Auth ID: ${authId} with data:`, userProfile);
    // First, update the user profile in your application
    await apiClient.put(`/Profile/auth/${authId}`, userProfile);
    console.log('User profile updated in the application successfully.');

    // Check and log the AUTH0_MANAGEMENT_API_TOKEN to ensure it is correctly set
    console.log(`AUTH0_MANAGEMENT_API_TOKEN: ${AUTH0_MANAGEMENT_API_TOKEN}`);

    // Update Auth0 user profile email separately
    if (userProfile.email) {
      console.log(`Updating Auth0 email for user ${authId} to ${userProfile.email}`);
      try {
        await axios.patch(
          `https://${AUTH0_DOMAIN}/api/v2/users/${authId}`,
          { email: userProfile.email },
          {
            headers: {
              'Authorization': `Bearer ${AUTH0_MANAGEMENT_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Auth0 email updated successfully.');
      } catch (auth0Error) {
        console.error('Error updating Auth0 email:', auth0Error.response?.data || auth0Error.message);
        throw auth0Error;
      }
    }

    // Update Auth0 user profile username separately
    if (userProfile.username) {
      console.log(`Updating Auth0 username for user ${authId} to ${userProfile.username}`);
      try {
        await axios.patch(
          `https://${AUTH0_DOMAIN}/api/v2/users/${authId}`,
          { username: userProfile.username },
          {
            headers: {
              'Authorization': `Bearer ${AUTH0_MANAGEMENT_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Auth0 username updated successfully.');
      } catch (auth0Error) {
        console.error('Error updating Auth0 username:', auth0Error.response?.data || auth0Error.message);
        throw auth0Error;
      }
    }

  } catch (error) {
    console.error('Error updating user profile', error);
    throw error;
  }
};

export const deleteUserProfile = async (id) => {
  try {
    await apiClient.delete(`/Profile/${id}`);
    console.log('User profile deleted successfully.');
  } catch (error) {
    console.error('Error deleting user profile', error);
    throw error;
  }
};
