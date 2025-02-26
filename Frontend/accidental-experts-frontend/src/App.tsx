import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/HomePage/home.tsx';
import JobSearchPage from "./Pages/JobSearchPage/JobSearchPage.tsx";
import Header from './Components/Header/Header.tsx';

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/job-search" element={<JobSearchPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
