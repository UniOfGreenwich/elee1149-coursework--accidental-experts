import * as React from 'react';
import JobSearchCard from '../../Components/JobSearchCard/JobSearchCard.tsx';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { retrieveAccountInfo } from '../../dataGateway.ts';
import EditAccountInfo from '../../Components/EditAccountInfo/EditAccountInfo.tsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.tsx';
import JobCarousel from '../../Components/JobCarousel/JobCarousel.tsx';

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
                <Col xs={12} md={6}>
                    <EditAccountInfo accountInfo={accountInfo.profile} />
                </Col>
                <Col xs={12} md={6}>
                    {/*TODO history panel*/}
                </Col>
            </Row>
        </Container>
    );
}

export default JobSeekerDashboard;
