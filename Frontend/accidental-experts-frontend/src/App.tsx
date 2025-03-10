import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/HomePage/home.tsx';
import JobSearchPage from './Pages/JobSearchPage/JobSearchPage.tsx';
import Header from './Components/Header/Header.tsx';
import LoginAndRegistration from './Pages/LoginAndRegistrationPage/login-and-registration.tsx';
import { RoutesProvider, useRoutes } from './RoutesContext';

function App() {
    return (
        <RoutesProvider>
            <Router>
                <div className="App">
                    <Header />
                    <RoutesComponent />
                </div>
            </Router>
        </RoutesProvider>
    );
}

const RoutesComponent = () => {
    const { homePath, jobSearchPath, loginAndRegistrationPath } = useRoutes();

    return (
        <Routes>
            <Route path={homePath} element={<HomePage />} />
            <Route path={jobSearchPath} element={<JobSearchPage />} />
            <Route
                path={loginAndRegistrationPath}
                element={<LoginAndRegistration />}
            />
        </Routes>
    );
};

export default App;
