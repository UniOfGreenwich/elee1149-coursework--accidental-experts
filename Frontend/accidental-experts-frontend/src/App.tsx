import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './destyle.css';
import HomePage from './Pages/HomePage/home.tsx';
import JobSearchPage from './Pages/JobSearchPage/JobSearchPage.tsx';
import Header from './Components/Header/Header.tsx';
import LoginAndRegistration from './Pages/LoginAndRegistrationPage/login-and-registration.tsx';
import { RoutesProvider, useRoutes } from './RoutesContext';
import JobSeekerDashboard from './Pages/JobSeekerDashboard/JobSeekerDashboard.tsx';
import Footer from './Components/Footer/Footer.tsx';
import EmployerDashboardPage from "./Pages/EmployerDashboardPage/employerDashboard.tsx";

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
        employerDashboardPath,
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
            <Route
                path={employerDashboardPath}
                element={<EmployerDashboardPage />}
            />
        </Routes>
    );
};

export default App;
