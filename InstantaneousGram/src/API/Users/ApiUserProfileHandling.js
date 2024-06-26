import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_DOCKER_URL || 'http://localhost:5500';
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_MANAGEMENT_API_TOKEN = process.env.REACT_APP_AUTH0_MANAGEMENT_API_TOKEN;

const apiClient = axios.create({
  baseURL: `${BASE_URL}0/userprofile/api`,
});

apiClient.defaults.headers.post['Content-Type'] = 'application/json';
apiClient.defaults.headers.put['Content-Type'] = 'application/json';

export const getUserProfileByAuthId = async (authId, token) => {
  try {
    console.log('Token used for request:', token);
    const response = await apiClient.get(`/Profile/auth/${authId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile by Auth ID', error);
    throw error;
  }
};

export const updateUserProfile = async (authId, userProfile, token) => {
  try {
    console.log(`Updating user profile for Auth ID: ${authId} with data:`, userProfile);
    await apiClient.put(`/Profile/auth/${authId}`, userProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User profile updated in the application successfully.');

    console.log(`AUTH0_MANAGEMENT_API_TOKEN: ${AUTH0_MANAGEMENT_API_TOKEN}`);

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

export const deleteUserProfile = async (id, token) => {
  try {
    await apiClient.delete(`/Profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User profile deleted successfully.');
  } catch (error) {
    console.error('Error deleting user profile', error);
    throw error;
  }
};
