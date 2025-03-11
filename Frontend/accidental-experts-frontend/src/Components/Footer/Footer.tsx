import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Footer.scss'; // Import the footer styling

export default function Footer() {
    return (
        <div className="footerWrapper">
            <div className="footer">
                <div className="website-nameWrapper">
                    <div className="website-name">
                        Accidentally
                        <br />
                        Unemployed
                    </div>
                </div>
                <div className="linksWrapper">
                    <div className="links">
                        <div className="linkDetail">
                            <a href="#">Contact</a>
                            <div className="linkDetailWrapper">
                                <ul>
                                    <li>
                                        <p className="linkDetailContent">
                                            no-reply@accidental-experts.co.uk
                                        </p>
                                    </li>
                                    <li>
                                        <p className="linkDetailContent">
                                            slawrence@accidental-experts.co.uk
                                        </p>
                                    </li>
                                    <li>
                                        <p className="linkDetailContent">
                                            npatel@accidental-experts.co.uk
                                        </p>
                                    </li>
                                    <li>
                                        <p className="linkDetailContent">
                                            hgately@accidental-experts.co.uk
                                        </p>
                                    </li>
                                    <li>
                                        <p className="linkDetailContent">
                                            jpittman@accidental-experts.co.uk
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="linkDetail">
                            <a href="#">FAQ</a>
                            <div>No questions please, thanks.</div>
                        </div>
                        <div className="linkDetail">
                            <a href="#">Help</a>
                            <div>HELLLPPP!!! can be found here</div>
                        </div>
                        <div className="linkDetail">
                            <a href="#">About</a>
                            <div>About who, what, where, how?</div>
                        </div>
                        <div className="linkDetail">
                            <a href="#">T&Cs</a>
                            <div>Blah, blah, blah.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
