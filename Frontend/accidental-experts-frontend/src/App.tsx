import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/HomePage/home.tsx';
import JobSearchPage from "./Pages/JobSearchPage/JobSearchPage.tsx";
import Header from './Components/Header/Header.tsx';
import LoginAndRegistration from './Pages/login-and-registration.tsx';

function App() {
    const baseUrl = "elee1149-coursework--accidental-experts";
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path={baseUrl+"/"} element={<HomePage />} />
                    <Route path={baseUrl+"/job-search"} element={<JobSearchPage/>} />

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
