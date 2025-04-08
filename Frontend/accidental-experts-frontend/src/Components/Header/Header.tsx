import React, { useEffect, useState } from 'react';
import './Header.scss'; // Import the SCSS file
import { useRoutes } from '../../RoutesContext.tsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';
    const {
        homePath,
        jobSearchPath,
        loginAndRegistrationPath,
        employerDashboardPath,
    } = useRoutes();

    const [userId, setUserId] = useState(() =>
        sessionStorage.getItem('userID')
    );

    const navigate = useNavigate()

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentUserId = sessionStorage.getItem('userID');
            if (currentUserId !== userId) {
                setUserId(currentUserId);
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [userId]);

    function handleLogout() {
        sessionStorage.removeItem('userID');
        setUserId(null);
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
                        <Link to={jobSearchPath}>Job Search</Link>
                        <Link to={employerDashboardPath}>
                            Employer Dashboard
                        </Link>
                        <a href="#">Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
