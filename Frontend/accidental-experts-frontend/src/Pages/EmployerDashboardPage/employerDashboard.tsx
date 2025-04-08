import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CreateJobListingForm from '../../Components/JobListingForm/CreateJobListingForm';
import './EmployerDashboardPage.scss';
import EditAccountInfo from "../../Components/EditAccountInfo/EditAccountInfo";
import SupportComponent from "../../Components/SupportComponent/SupportComponent.tsx";
import { retrieveAccountInfo } from "../../dataGateway";
import { Job } from "../../Components/JobCarousel/JobCarousel";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

interface ProfileInfo {
    [key: string]: any;
}

interface AccountInfo {
    profile: ProfileInfo;
    applied: Job[];
}

const EmployerDashboardPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const navigate = useNavigate();
    const verifyUserEffectRan = useRef<boolean>(false);
    const fetchAccountInfoEffectRan = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (verifyUserEffectRan.current === false) {
            const userID = sessionStorage.getItem('userID');
            const userType = sessionStorage.getItem('userType');
            const verifyUser = () => {
                if (userID === null) {
                    alert("Please log in before entering the recruiter dashboard");
                    return navigate('/');
                } else if (userType !== "employer") {
                    alert("You are a job seeker, please view the job seeker dashboard");
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
                try {
                    const userID = sessionStorage.getItem("userID");
                    if (userID) {
                        const response = await retrieveAccountInfo(userID);
                        if (response && response.profile) {
                            setAccountInfo(response as AccountInfo);
                        } else {
                            console.error("Fetched account info is missing expected structure:", response);
                            setAccountInfo(null);
                        }
                    } else {
                        console.warn("UserID not found in sessionStorage for fetching.");
                        setAccountInfo(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch account info:", error);
                    setAccountInfo(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAccountInfo();
            fetchAccountInfoEffectRan.current = true;
        }
    }, []);

    const handleShowFormClick = () => {
        setIsFormVisible(true);
    };

    if (isLoading) {
        return (
            <Container fluid className="enrollment-page vh-100 d-flex justify-content-center align-items-center">
                <LoadingScreen text="Loading account information..." />
            </Container>
        );
    }

    if (!accountInfo) {
        return (
            <Container className="mt-4">
                <h1 className="text-center">Employer Dashboard</h1>
                <p className="text-danger text-center mt-4">
                    Error: Could not load account information. Please try refreshing the page or logging in again.
                </p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Employer Dashboard</h1>

            <div className="form-box-container">
                {!isFormVisible ? (
                    <div className="text-center py-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleShowFormClick}
                        >
                            Create New Job Listing
                        </Button>
                    </div>
                ) : (
                    <>
                        <h2 className="form-box-heading">Create New Job Listing</h2>
                        <CreateJobListingForm />
                    </>
                )}
            </div>

            <Row className="mt-5">
                <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <EditAccountInfo accountInfo={accountInfo.profile} />
                </Col>
                <Col xs={12} md={6}>
                    <SupportComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default EmployerDashboardPage;
