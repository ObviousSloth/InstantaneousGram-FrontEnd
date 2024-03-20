import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';

// Import other components/pages here

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                {/* Add more routes for other components/pages here */}
            </Switch>
        </Router>
    );
}

export default AppRouter;