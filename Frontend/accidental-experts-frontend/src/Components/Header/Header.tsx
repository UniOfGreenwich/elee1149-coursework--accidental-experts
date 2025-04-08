import React, { useEffect, useState } from 'react';
import './Header.scss';
import { useRoutes } from '../../RoutesContext.tsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';
    const {
        homePath,
        jobSearchPath,
        loginAndRegistrationPath,
        employerDashboardPath,
        jobSeekerDashboardPath,
    } = useRoutes();
    const [currentUserType, setCurrentUserType] = useState<string | null>(null);

    const [userId, setUserId] = useState(() =>
        sessionStorage.getItem('userID')
    );

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentUserId = sessionStorage.getItem('userID');
            if (currentUserId !== userId) {
                setUserId(currentUserId);
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [userId]);

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUserType = sessionStorage.getItem('userType');
            setCurrentUserType(storedUserType);
        }, 500);
    }, []);

    useEffect(() => {
        const redirectUnauthorizedAccess = () => {
            const unauthorizedAccessMap = {
                employer: [homePath],
                job_seeker: [homePath],
            };

            const currentPath = location.pathname;
            const unauthorizedPaths =
                unauthorizedAccessMap[
                    currentUserType as keyof typeof unauthorizedAccessMap
                ] || [];

            if (unauthorizedPaths.includes(currentPath)) {
                window.location.href = 'https://tinyurl.com/403-unauthorised';
            }
        };

        redirectUnauthorizedAccess();
    }, [
        currentUserType,
        location.pathname,
        jobSearchPath,
        employerDashboardPath,
    ]);

    function handleLogout() {
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <div className="headerWrapper">
            <div className="header">
                <div className="logoWrapper">
                    <div className="logo-area">
                        <img
                            src={logoURL}
                            alt="Accidentally Unemployed Logo"
                            className="logo"
                        />
                        <div className="website-name">
                            Accidentally
                            <br />
                            Unemployed
                        </div>
                    </div>
                </div>
                <div className="linksWrapper">
                    <div>
                        {userId ? (
                            <div className="login-signup">
                                <span className="user-greeting">
                                    Welcome, {sessionStorage.firstName}
                                </span>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="login-signup">
                                <Link to={loginAndRegistrationPath}>
                                    Log in
                                </Link>
                                <Link to={loginAndRegistrationPath}>
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="nav-links">
                        <Link to={homePath}>Home</Link>

                        {currentUserType === null ? (
                            <Link to={jobSearchPath}>Job Search</Link>
                        ) : currentUserType === 'job_seeker' ? (
                            <Link to={jobSearchPath}>Job Search</Link>
                        ) : null}

                        {currentUserType === 'employer' ? (
                            <Link to={employerDashboardPath}>
                                Employer Dashboard
                            </Link>
                        ) : currentUserType === 'job_seeker' ? (
                            <Link to={jobSeekerDashboardPath}>
                                Job Seeker Dashboard
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
