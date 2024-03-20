import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';


function App() {
  return (
    
         <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                {/* Add more routes for other components/pages here */}
            </Routes>
        </Router>
    
  );
}

export default App;
