import * as React from 'react';
import JobSearchCard from '../../Components/JobSearchCard/JobSearchCard.tsx';
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {retrieveJobs} from "../../dataGateway.ts";

function JobSearchPage() {

    const [numOfJobs, setNumOfJobs] = useState(0);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            let response = await retrieveJobs();
            setNumOfJobs(response.length);
            setJobs(response);
        }
        fetchJobs();
    }, [numOfJobs]);


    return (
        <Container fluid="xxl" className="enrollment-page">
            <JobSearchCard jobs={jobs} numOfJobs={numOfJobs} />
            {/*<FooterPanel/>*/}
        </Container>
    );
}

export default JobSearchPage;