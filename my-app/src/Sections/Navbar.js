import React from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/add-post">Add Post</Link></li>
                <li><Link to="/likes">Likes</Link></li>
                <li><Link to="/user-profile">User Profile</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;