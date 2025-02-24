import './Header.scss';
import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";

export default function Header() {
    return(
    <Row className={'header'}>
        <Col xs={6}>
            <Card.Text className="card-text">Sam helped here</Card.Text>
        </Col>
    </Row>
    )
}