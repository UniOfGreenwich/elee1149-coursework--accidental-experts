import React, { JSX, useEffect, useState } from 'react';
import {Button, Col, Container, Dropdown, DropdownToggle, Form, Row} from 'react-bootstrap';
import './EditAccountInfo.scss';
import DOMPurify from "dompurify";

interface EditAccountInfoProps {
    accountInfo: any;
}

export default function EditAccountInfo(props: EditAccountInfoProps): JSX.Element {
    const { accountInfo } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accountStatus, setAccountStatus] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;

    const accountStatusOptions = [
        { value: 'Seeking', label: 'Seeking' },
        { value: 'Not Seeking', label: 'Not Seeking' },
    ];

    useEffect(() => {
        if (accountInfo) {
            setFirstName(accountInfo.firstName || '');
            setLastName(accountInfo.lastName || '');
            setEmail(accountInfo.email || '');
            setPhoneNumber(accountInfo.phoneNumber || '');
            setAccountStatus(accountInfo.accountStatus || '');
        }
    }, [accountInfo]);

    useEffect(() => {
        setIsFirstNameValid(firstName.trim() !== '');
        setIsLastNameValid(lastName.trim() !== '');
        setIsEmailValid(emailRegex.test(email));
        setIsPhoneNumberValid(phoneRegex.test(phoneNumber));
    }, [firstName, lastName, email, phoneNumber]);

    function sanitizeData(inputData: string) {
        return DOMPurify.sanitize(inputData)
    }

    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setFirstName(value);
        setIsFirstNameValid(value.trim() !== '')
    }

    function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setLastName(value);
        setIsLastNameValid(value.trim() !== '')
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setEmail(value);
        setIsEmailValid(emailRegex.test(value))

    }

    function handlePhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setPhoneNumber(value);
        setIsPhoneNumberValid(phoneRegex.test(value))
    }

    const handleAccountStatusChange = (event) => {
        setAccountStatus(event.target.value);
    };


    function handleSaveProfile() {
        //todo call endpoint to updat
    }

    return (
        <Container className={'accountContainer'}>
            <div className={'header'}>My Profile</div>
                <Form>
                    <Row className="mb-3">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group as={Col}>
                                <Form.Label className="form-label">
                                    {'First Name'}
                                    <span className="form-asterisk"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-input"
                                    placeholder="First Name"
                                    size="lg"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    isInvalid={!isFirstNameValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {'First Name Invalid'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group as={Col}>
                                <Form.Label className="form-label">
                                    {'Last Name'}
                                    <span className="form-asterisk"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-input"
                                    placeholder="Last Name"
                                    size="lg"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    isInvalid={!isLastNameValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {'Last Name Invalid'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group as={Col}>
                                <Form.Label className="form-label">
                                    {'Email'}
                                    <span className="form-asterisk"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-input"
                                    placeholder="Email"
                                    size="lg"
                                    value={email}
                                    onChange={handleEmailChange}
                                    isInvalid={!isEmailValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {'Email Invalid'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group as={Col}>
                                <Form.Label className="form-label">
                                    {'Phone Number'}
                                    <span className="form-asterisk"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-input"
                                    placeholder="Phone Number"
                                    size="lg"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    isInvalid={!isPhoneNumberValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {'Phone Number Invalid'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group as={Col}>
                                <Form.Label className="form-label">
                                    {'Account Status'}
                                    <span className="form-asterisk"> *</span>
                                </Form.Label>

                                <Form.Select
                                    aria-label="Account Status"
                                    value={accountStatus}
                                    onChange={handleAccountStatusChange}
                                >
                                    {accountStatusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className={"top-padding"}>
                        <Button
                            className={`${'roundedIcon'} ${'buttonStyle'}`}
                            onClick={handleSaveProfile}
                            disabled={!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneNumberValid}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
        </Container>
    );
}
