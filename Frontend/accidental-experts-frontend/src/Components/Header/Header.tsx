import React from 'react';
import './Header.scss'; // Import the SCSS file
import {useRoutes} from "../../RoutesContext.tsx";
import { Link } from 'react-router-dom';

export default function Header() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';
    const { homePath, jobSearchPath } = useRoutes();

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
                    <div className="login-signup">
                        <a href="#">Log in</a>
                        <a href="#">Sign up</a>
                    </div>
                    <div className="nav-links">
                        <Link to={homePath}>Home</Link>
                        <Link to={jobSearchPath}>Job Search</Link>
                        <a href="#">Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    );
}