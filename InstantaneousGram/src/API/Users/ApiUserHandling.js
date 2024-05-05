
// api.js

const BASE_URL = process.env.REACT_APP_BACKEND_DOCKER_URL;

async function getUsers() {
  const response = await fetch(`${BASE_URL}/api/Users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

async function getUserById(id) {
  const response = await fetch(`${BASE_URL}/api/Users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
  return response.json();
}
async function getUserByAuthId(authId) {
    const response = await fetch(`${BASE_URL}/api/Users/auth/${authId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${authId}`);
    }
    return response.json();
  }
  async function updateUser(authId, userData) {
    const response = await fetch(`${BASE_URL}/api/Users/${authId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error(`Failed to update user with ID ${authId}`);
    }
  }
  async function updateUserBio(authId, userData) {
    const user = { ...userData, Auth0Id: authId }; // Include Auth0Id in the user object
    console.log(user);
    const response = await fetch(`${BASE_URL}/api/Users/Update/Bio/${authId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) // Send the complete user object
    });
    if (!response.ok) {
      throw new Error(`Failed to update user with ID ${authId}`);
    }
  }

async function createUser(userData) {
  const response = await fetch(`${BASE_URL}/api/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}

async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/api/Users/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
}

async function checkUserExists(auth0Id) {
    try {
      // Make an API call to check if the user exists in the database
      const response = await fetch(`${BASE_URL}/api/users/check/${auth0Id}`);
      if (response.ok) {
        return true; // User exists
      } else {
        return false; // User doesn't exist
      }
    } catch (error) {
      console.error('Error checking user:', error);
      throw new Error('Error checking user');
    }
  }
  
  
  export { getUsers, getUserById, getUserByAuthId, updateUser, updateUserBio, createUser, deleteUser, checkUserExists }
