import './EditAccountInfo.scss';
import React, {JSX, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {post} from "axios";

interface EditAccountInfoProps {
    accountInfo: any[];
}


export default function EditAccountInfo(props: EditAccountInfoProps): JSX.Element {
    const { accountInfo } = props;
    const [firstName, setFirstName ] = useState(0);
    const [lastName, setLastName ] = useState(0);
    const [email, setEmail] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [accountStatus, setAccountStatus] = useState(0);
    const [addressLineOne, setAddressLineOne] = useState(0);
    const [addressLineTwo, setAddressLineTwo] = useState(0);
    const [city, setCity] = useState(0);
    const [county, setCounty] = useState(0);
    const [postcode, setPostcode] = useState(0);

    useEffect(() => {
        // setFirstName(accountInfo.firstName || '')
        // setLastName(accountInfo.lastName || '')
        // setEmail(accountInfo.email || '')
        // setPhoneNumber(accountInfo.phoneNumber || '')
    }, []);

    function isNameValid(name: number): boolean {
        return true
    }
    function handleFirstNameChange() {

    }
    function handleLastNameChange() {

    }

    function handleEmailChange() {

    }

    let isEmailValid = false;


    function handlePhoneNumberChange() {

    }

    let isMobilePhoneValid = false;
    let isZipcodeValid = false;

    function handlePostcodeChange() {

    }

    function handleCountyChange() {

    }

    let isCountyValid;

    function handleCityChange() {

    }

    let isCityValid;
    let isAddressLineOnevalid;

    function handleAddressLineOneChange() {

    }

    function isAddressLineTwoValid() {

    }

    return (
        <Container className={'account-container import'}>
            <div className={'header'}>My Profile</div>
                <Row className="mb-3">
                    <Col xs={12} md={4} lg={3}>
                        <div>Name</div>
                        <div>{firstName + " " + lastName}</div>
                    </Col>

                    <Col xs={12} md={4} lg={3}>
                        <div>Email</div>
                        <div>{email}</div>
                    </Col>
                </Row>
            <Row className="mb-3">
                <Col xs={12} md={4} lg={3}>
                    <div>Mobile Number</div>
                    <div>{phoneNumber}</div>
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <div>Account Status</div>
                    <div>{accountStatus}</div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} md={4} lg={3}>
                    <div>Home address</div>
                    <div>{addressLineOne}</div>
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <div>Address line two</div>
                    <div>{addressLineTwo}</div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} md={4} lg={3}>
                    <div>City</div>
                    <div>{city}</div>
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <div>County</div>
                    <div>{county}</div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} md={4} lg={3}>
                    <div>Postcode</div>
                    <div>{postcode}</div>
                </Col>
            </Row>
        </Container>
    );
}
