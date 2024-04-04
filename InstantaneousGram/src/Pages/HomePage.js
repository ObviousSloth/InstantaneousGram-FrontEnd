import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import LoginButton from '../components/Login.js';
import LogoutButton from '../components/LogOut.js';
import UserProfileButton from '../components/UserProfile.js'

function Home() {
  return (
    
    <div className="container mt-5">
        
      <h1 className="display-4">Welcome to My Website</h1>
      <Navbar />
      <LoginButton />
      <br />
      <LogoutButton />
      <br />
      <UserProfileButton />
      <p className="lead">This is a simple homepage built with React.</p>
      <p className="lead">Feel free to explore!</p>
      <Link to="/about" className="btn btn-primary">About Us</Link>
      
    </div>
  );
}

export default Home;