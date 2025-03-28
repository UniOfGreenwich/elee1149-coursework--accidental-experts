import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/HomePage/home.tsx';
import JobSearchPage from './Pages/JobSearchPage/JobSearchPage.tsx';
import Header from './Components/Header/Header.tsx';
import LoginAndRegistration from './Pages/LoginAndRegistrationPage/login-and-registration.tsx';
import { RoutesProvider, useRoutes } from './RoutesContext';
import JobSeekerDashboard from './Pages/JobSeekerDashboard/JobSeekerDashboard.tsx';
import Footer from './Components/Footer/Footer.tsx';

function App() {
    return (
        <RoutesProvider>
            <Router>
                <div className="App">
                    <Header />
                    <RoutesComponent />
                    <Footer />
                </div>
            </Router>
        </RoutesProvider>
    );
}

const RoutesComponent = () => {
    const {
        homePath,
        jobSearchPath,
        loginAndRegistrationPath,
        jobSeekerDashboardPath,
    } = useRoutes();

    return (
        <Routes>
            <Route path={homePath} element={<HomePage />} />
            <Route path={jobSearchPath} element={<JobSearchPage />} />
            <Route
                path={jobSeekerDashboardPath}
                element={<JobSeekerDashboard />}
            />
            <Route
                path={loginAndRegistrationPath}
                element={<LoginAndRegistration />}
            />
        </Routes>
    );
};

export default App;
