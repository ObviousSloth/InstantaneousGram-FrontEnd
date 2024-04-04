import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/Profile';

function App() {
  return (
  <Router>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Profile" element={<ProfilePage/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* Add more routes for other components/pages here */}
    </Routes>
</Router>
  );
}

export default App;
