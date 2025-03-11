import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Header.scss'; // Import the SCSS file
import { useRoutes } from '../../RoutesContext.tsx';
import { Link } from 'react-router-dom';

export default function Header() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';
    const { homePath, jobSearchPath, loginAndRegistrationPath } = useRoutes();

    return (
        <div className="headerWrapper">
            <Row className="header">
                <div className="logoWrapper">
                    <Col xs={3} className="logo-area">
                        <img
                            src={logoURL}
                            alt="Accidentally Unemployed Logo"
                            className="logo"
                        />
                        <Card.Text className="website-name">
                            Accidentally
                            <br />
                            Unemployed
                        </Card.Text>
                    </Col>
                </div>
                <div className="linksWrapper">
                    <Col xs={3} className="login-signup">
                        <Link to={loginAndRegistrationPath}>Log in</Link>
                        <Link to={loginAndRegistrationPath}>Sign up</Link>
                    </Col>
                    <Col xs={6} className="nav-links">
                        <Link to={homePath}>Home</Link>
                        <Link to={jobSearchPath}>Job Search</Link>
                        <a href="#">Dashboard</a>
                    </Col>
                </div>
            </Row>
        </div>
    );
}
