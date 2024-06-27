import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* Add more routes for other components/pages here */}
      </Routes>
    </Router>
  );
}

export default App;
