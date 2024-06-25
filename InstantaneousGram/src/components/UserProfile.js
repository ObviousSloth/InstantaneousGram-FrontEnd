import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserProfileByAuthId } from '../API/Users/ApiUserProfileHandling';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const profile = await getUserProfileByAuthId(user.sub);
          setUsername(profile.username);
          setProfileData(profile);
          setLoadingProfile(false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setLoadingProfile(false);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, user]);

  if (isLoading || loadingProfile) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && profileData && (
      <div>
        {/* <img src={user.picture} alt={username} /> */}
        <h2>{username}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
