import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Header.scss'; // Import the SCSS file

export default function Header() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';

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
                        <a href="#">Log in</a>
                        <a href="#">Sign up</a>
                    </Col>
                    <Col xs={6} className="nav-links">
                        <a href="#">Home</a>
                        <a href="#">Job Search</a>
                        <a href="#">Dashboard</a>
                    </Col>
                </div>
            </Row>
        </div>
    );
}
