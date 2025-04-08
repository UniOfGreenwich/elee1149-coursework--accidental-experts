import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import './SeekerSupport.scss';

export default function SeekerSupport() {

    return (
        <Container className={'accountContainer'}>
            <Card className={'support-card'}>
                <div className={'header'}>Support</div>
                <Card.Body>
                    <Card.Text>
                        <strong>{'Email: '}</strong>
                        {'no-reply@accidental-experts.co.uk'}
                        <br />
                        <br />
                        <strong>{'Address: '}</strong>
                        <br />
                        {'10 Downing Street'}
                        <br />
                        {'City of Westminster'}
                        <br />
                        {'London'}
                        <br />
                        {'SW1A 2AA'}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}
