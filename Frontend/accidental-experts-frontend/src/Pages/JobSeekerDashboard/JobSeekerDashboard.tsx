import * as React from 'react';
import JobSearchCard from '../../Components/JobSearchCard/JobSearchCard.tsx';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { retrieveAccountInfo } from '../../dataGateway.ts';
import EditAccountInfo from "../../Components/EditAccountInfo/EditAccountInfo.tsx";
import LoadingScreen from "../LoadingScreen/LoaidngScreen.tsx"; // Corrected typo: LoaidngScreen -> LoadingScreen

function JobSeekerDashboard() {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        setIsLoading(true)
        async function fetchAccountInfo() {
                const response = await retrieveAccountInfo();
                setAccountInfo(response);
        }
        fetchAccountInfo();
        setIsLoading(false)
    }, []);

    if (isLoading) {
        return (
            <Container fluid="xxl" className="enrollment-page">
                <LoadingScreen text="Loading account information..." />
            </Container>
        );
    }

    return (
        <Container fluid="xxl" className="enrollment-page">
                <EditAccountInfo accountInfo={accountInfo.profile} />
        </Container>
    );
}

export default JobSeekerDashboard;
