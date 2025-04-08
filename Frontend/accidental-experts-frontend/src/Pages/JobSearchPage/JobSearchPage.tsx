import * as React from 'react';
import JobSearchCard from '../../Components/JobSearchCard/JobSearchCard.tsx';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { retrieveJobs } from '../../dataGateway.ts';
import LoadingSpinnerOverlay from '../../Components/Common/LoadingSpinnerOverlay.tsx';

function JobSearchPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [numOfJobs, setNumOfJobs] = useState<number>(0);
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await retrieveJobs();
                if (Array.isArray(response)) {
                    setNumOfJobs(response.length);
                    setJobs(response);
                } else {
                    console.error(
                        'Received non-array response from retrieveJobs:',
                        response
                    );
                    setNumOfJobs(0);
                    setJobs([]);
                }
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                setNumOfJobs(0);
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobs();
    }, []);

    return (
        <Container fluid="xxl" className="enrollment-page">
            {isLoading ? (
                <LoadingSpinnerOverlay />
            ) : (
                <JobSearchCard jobs={jobs} numOfJobs={numOfJobs} />
            )}
        </Container>
    );
}

export default JobSearchPage;
