import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Footer.scss'; // Import the footer styling

export default function Footer() {
    const logoURL =
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZvYXg5empwNDhtY3I5ZG5xOTBjOWlqMWNwN2FwaWw1azVqdWVuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VQXdNn4MMLmNtkhPCV/giphy.gif';

    return (
        <div className="footerWrapper">
            <Row className="footer">
                <div className="website-nameWrapper">
                    <Card.Text className="website-name">
                        Accidentally Unemployed
                    </Card.Text>
                </div>
                <div className="linksWrapper">
                    <Row xs={3} className="links">
                        <Col className="linkDetail">
                            <a href="#">Contact</a>
                            <div>no-reply@accidental-experts.co.uk</div>
                            <div>slawrence@accidental-experts.co.uk</div>
                            <div>npatel@accidental-experts.co.uk</div>
                            <div>hgately@accidental-experts.co.uk</div>
                            <div>jpittman@accidental-experts.co.uk</div>
                        </Col>
                        <Col className="linkDetail">
                            <a href="#">FAQ</a>
                            <div>No questions please, thanks.</div>
                        </Col>
                        <Col className="linkDetail">
                            <a href="#">Help</a>
                            <div>HELLLPPP!!!</div>
                        </Col>
                        <Col className="linkDetail">
                            <a href="#">About</a>
                            <div>About who, what, where, how?</div>
                        </Col>
                        <Col className="linkDetail">
                            <a href="#">Terms</a>
                            <div>Blah, blah, blah.</div>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    );
}
