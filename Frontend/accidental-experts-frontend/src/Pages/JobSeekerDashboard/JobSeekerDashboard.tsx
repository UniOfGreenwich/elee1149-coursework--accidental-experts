import * as React from 'react';
import {useEffect, useState} from "react";
import {retrieveAccountInfo} from "../../dataGateway.ts";
import {Col, Container, Row} from "react-bootstrap";
import LoadingScreen from "../LoadingScreen/LoadingScreen.tsx";
import JobCarousel from "../../Components/JobCarousel/JobCarousel.tsx";
import EditAccountInfo from "../../Components/EditAccountInfo/EditAccountInfo.tsx";
import SeekerSupport from "../../Components/SeekerSupport/SeekerSupport.tsx";


function JobSeekerDashboard() {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAccountInfo() {
            setIsLoading(true);
            try {
                const response = await retrieveAccountInfo();
                setAccountInfo(response);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAccountInfo();
    }, []);

    if (isLoading) {
        return (
            <Container fluid="xxl" className="enrollment-page">
                <LoadingScreen text="Loading account information..." />
            </Container>
        );
    }

    return (
        <Container fluid="xxl">
            <Row>
                <JobCarousel accountInfo={accountInfo.applied} />
            </Row>
            <Row>
                <Col xs={12} md={6} style={{ margin: '0 0 2rem 0' }}>
                    <EditAccountInfo accountInfo={accountInfo.profile} />
                </Col>
                <Col  xs={12} md={6}>
                    <SeekerSupport />
                </Col>
            </Row>
        </Container>
    );
}

export default JobSeekerDashboard;
