import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/home.tsx';
import LoginAndRegistration from './Pages/login-and-registration.tsx';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/login-and-registration"
                        element={<LoginAndRegistration />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
