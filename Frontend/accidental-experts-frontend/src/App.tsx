import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/home.tsx';
import Header from './Components/Header/Header.tsx';

function App() {
    const baseUrl = "elee1149-coursework--accidental-experts";
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path={baseUrl+"/"} element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
