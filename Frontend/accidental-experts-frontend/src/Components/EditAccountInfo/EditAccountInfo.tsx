import React, { JSX, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from 'react-bootstrap';
import './EditAccountInfo.scss';
import DOMPurify from 'dompurify';
import {saveInformation} from "../../dataGateway.ts";

interface EditAccountInfoProps {
    accountInfo: any;
}

export default function EditAccountInfo(
    props: EditAccountInfoProps
): JSX.Element {
    const { accountInfo } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    const accountStatusOptions = [
        { value: 'Seeking', label: 'Seeking' },
        { value: 'Not Seeking', label: 'Not Seeking' },
    ];

    useEffect(() => {
        if (accountInfo) {
            setFirstName(accountInfo.firstName || '');
            setLastName(accountInfo.lastName || '');
            setEmail(accountInfo.email || '');
        }
    }, [accountInfo]);

    useEffect(() => {
        setIsFirstNameValid(firstName.trim() !== '');
        setIsLastNameValid(lastName.trim() !== '');
        setIsEmailValid(emailRegex.test(email));
    }, [firstName, lastName, email]);

    function sanitizeData(inputData: string) {
        return DOMPurify.sanitize(inputData);
    }

    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setFirstName(value);
        setIsFirstNameValid(value.trim() !== '');
    }

    function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setLastName(value);
        setIsLastNameValid(value.trim() !== '');
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = sanitizeData(event.target.value);
        setEmail(value);
        setIsEmailValid(emailRegex.test(value));
    }


    function handleSaveProfile() {
        const userID = sessionStorage.getItem("userID");
        saveInformation(userID, firstName, lastName, email)
    }

    return (
        <Container className={'accountContainer'}>
            <Card className={'account-info-card'}>
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
                    </Row>
                    <div className={'top-padding'}>
                        <Button
                            className={`${'roundedIcon'} ${'buttonStyle'}`}
                            onClick={handleSaveProfile}
                            disabled={
                                !isFirstNameValid ||
                                !isLastNameValid ||
                                !isEmailValid
                            }
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}
