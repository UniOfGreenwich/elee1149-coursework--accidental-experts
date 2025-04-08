import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { retrieveAccountInfo } from '../../dataGateway';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import JobCarousel from '../../Components/JobCarousel/JobCarousel';
import { Job } from '../../Components/JobCarousel/JobCarousel';
import EditAccountInfo from '../../Components/EditAccountInfo/EditAccountInfo';
import SupportComponent from '../../Components/SeekerSupport/SupportComponent.tsx';
import { useNavigate } from "react-router-dom";

interface ProfileInfo {
    [key: string]: any;
}

interface AccountInfo {
    profile: ProfileInfo;
    applied: Job[];
}


function JobSeekerDashboard() {
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasUserApplied, setHasUserApplied] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifyUserEffectRan = useRef<boolean>(false);
    const fetchAccountInfoEffectRan = useRef<boolean>(false);

    useEffect(() => {
        if (verifyUserEffectRan.current === false) {
            const userID = sessionStorage.getItem('userID');
            const userType = sessionStorage.getItem('userType');

            const verifyUser = () => {
                if (userID === null) {
                    alert("Please log in before entering the job seeker dashboard");
                    return navigate('/');
                } else if (userType !== "job_seeker") {
                    alert("You are a Recruiter, please view the recruiter dashboard");
                    return navigate('/');
                }
            };

            verifyUser();
            verifyUserEffectRan.current = true;
        }
    }, [navigate]);

    useEffect(() => {
        if (fetchAccountInfoEffectRan.current === false) {
            const fetchAccountInfo = async () => {
                setIsLoading(true);
                try {
                    const userID = sessionStorage.getItem("userID");
                    if (userID) {
                        const response = await retrieveAccountInfo(userID);
                        setAccountInfo(response as AccountInfo);
                    }
                } catch (error) {
                    setAccountInfo(null);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAccountInfo();
            fetchAccountInfoEffectRan.current = true;
        }
    }, []);

    useEffect(() => {
        try {
            if (accountInfo && accountInfo.applied && accountInfo.applied.length > 0) {
                setHasUserApplied(true);
            } else {
                setHasUserApplied(false);
            }
        } catch (e) {
            console.error("Error checking applied status:", e);
            setHasUserApplied(false);
        }
    }, [accountInfo]);

    if (isLoading) {
        return (
            <Container fluid="xxl" className="enrollment-page">
                <LoadingScreen text="Loading account information..." />
            </Container>
        );
    }

    if (!accountInfo) {
        return (
            <Container fluid="xxl" style={{ marginTop: '2rem' }}>
                <Row>
                    <Col>
                        <p className="text-danger">Error: Could not load account information.</p>
                        <p>Please try logging out and logging back in. If the problem persists, contact support.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid="xxl" style={{ marginTop: '2rem' }}>
            {hasUserApplied && accountInfo.applied && accountInfo.applied.length > 0 && (
                <Row className="mb-4">
                    <Col>
                        <JobCarousel accountInfo={accountInfo.applied} />
                    </Col>
                </Row>
            )}

            <Row>
                {accountInfo.profile ? (
                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                        <EditAccountInfo accountInfo={accountInfo.profile} />
                    </Col>
                ) : (
                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                        <p>Profile information is not available.</p>
                    </Col>
                )}
                <Col xs={12} md={6}>
                    <SupportComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default JobSeekerDashboard;
