import './JobSearchCard.scss';

import React, { JSX, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {IoIosBriefcase} from "react-icons/io";
import {applyForJob} from "../../dataGateway.ts";


interface Job {
    id: number;
    title: string;
    description: string;
    address: string;
    county: string | null;
    postcode: string | null;
    salary: number | null;
    employmentType: string;
    postingDate: string | null;
    expiryDate: string;
}

interface JobSearchCardProps {
    jobs: Job[];
    numOfJobs: number;
}

const formatSalary = (salary: number | null): string => {
    if (salary === null || salary === undefined) {
        return 'N/A';
    }
    return `£${salary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatEmploymentType = (type: string): string => {
    if (!type) return 'N/A';
    return type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const calculateTimeDifference = (
    dateString: string | null
): {
    days: number | null;
    hours: number | null;
    minutes: number | null;
    totalSeconds: number | null;
} => {
    if (!dateString)
        return { days: null, hours: null, minutes: null, totalSeconds: null };
    try {
        const targetDate = new Date(dateString);
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference < 0)
            return { days: 0, hours: 0, minutes: 0, totalSeconds: 0 };

        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor(totalSeconds / (60 * 60)) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;

        return { days, hours, minutes, totalSeconds };
    } catch (e) {
        console.error('Error parsing date:', dateString, e);
        return { days: null, hours: null, minutes: null, totalSeconds: null };
    }
};

const calculateDaysAgo = (dateString: string | null): number | null => {
    if (!dateString) return null;
    try {
        const postDate = new Date(dateString);
        const now = new Date();
        const difference = now.getTime() - postDate.getTime();
        if (difference < 0) return 0;
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    } catch (e) {
        console.error('Error parsing posting date:', dateString, e);
        return null;
    }
};

export default function JobSearchCard(props: JobSearchCardProps): JSX.Element {
    const { jobs, numOfJobs } = props;
    const [expandedDescriptions, setExpandedDescriptions] = useState<
        Record<number, boolean>
    >({});
    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 20;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(numOfJobs / jobsPerPage);

    const toggleDescription = (jobId: number) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [jobId]: !prev[jobId],
        }));
    };

    function generateJobCards() {
        return currentJobs.map((job) => (
            <Row key={job.id}>
                <Col xs={12} md={10} lg={8} className={'row-control mx-auto'}>
                    {infoGraphic(
                        job,
                        expandedDescriptions[job.id] || false,
                        toggleDescription
                    )}
                </Col>
            </Row>
        ));
    }

    const infoGraphic = (
        job: Job,
        isExpanded: boolean,
        toggleExpand: (id: number) => void
    ) => {
        const expiryTime = calculateTimeDifference(job.expiryDate);
        const daysPostedAgo = calculateDaysAgo(job.postingDate);
        const isDescriptionLong = job.description.length > 100;

        return (
            <Card className={'info-box mb-3'}>
                <Card.Body>
                    <Row className="mb-2 align-items-center">
                        <Col xs={"auto"}>
                            <IoIosBriefcase />
                        </Col>
                    </Row>
                    <Card.Title className={'card-title text-colour'}>
                        {job.title}
                    </Card.Title>

                    {isDescriptionLong ? (
                        <div
                            onClick={() => toggleExpand(job.id)}
                            style={{ cursor: 'pointer' }}
                            aria-expanded={isExpanded}
                        >
                            <Card.Text className={'card-text text-colour'}>
                                {isExpanded
                                    ? job.description
                                    : `${job.description.substring(0, 100)}...`}
                            </Card.Text>
                        </div>
                    ) : (
                        <Card.Text className={'card-text text-colour'}>
                            {job.description}
                        </Card.Text>
                    )}

                    <Row className={'job-details-row mt-3'}>
                        <Col xs={12} sm={6} className="mb-2">
                            <Card.Text className="card-text text-colour">
                                <strong>Salary:</strong>{' '}
                                {formatSalary(job.salary)}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={6} className="mb-2">
                            <Card.Text className="card-text text-colour">
                                <strong>Type:</strong>{' '}
                                {formatEmploymentType(job.employmentType)}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={6} className="mb-2">
                            <Card.Text className="card-text text-colour">
                                <strong>Location:</strong> {job.address}
                                {job.county ? `, ${job.county}` : ''}{' '}
                                {job.postcode ? `(${job.postcode})` : ''}
                            </Card.Text>
                        </Col>
                        {daysPostedAgo !== null && (
                            <Col xs={12} sm={6} className="mb-2">
                                <Card.Text className="card-text text-colour">
                                    <strong>Posted:</strong>{' '}
                                    {daysPostedAgo === 0
                                        ? 'Today'
                                        : `${daysPostedAgo} day${daysPostedAgo !== 1 ? 's' : ''} ago`}
                                </Card.Text>
                            </Col>
                        )}
                        {expiryTime.totalSeconds !== null &&
                            expiryTime.totalSeconds > 0 && (
                                <Col xs={12} sm={6} className="mb-2">
                                    <Card.Text className="card-text text-colour">
                                        <strong>Closes in:</strong>{' '}
                                        {expiryTime.days}d {expiryTime.hours}h{' '}
                                        {expiryTime.minutes}m
                                    </Card.Text>
                                </Col>
                            )}
                        {expiryTime.totalSeconds === 0 && (
                            <Col xs={12} sm={6} className="mb-2">
                                <Card.Text className="card-text text-danger">
                                    <strong>Closed</strong>
                                </Card.Text>
                            </Col>
                        )}
                    </Row>
                    <Button
                        className={'rounded-icon button-style mt-3'}
                        onClick={() => onApply(job.id)}
                    >
                        Apply Now!
                    </Button>
                </Card.Body>
            </Card>
        );
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setExpandedDescriptions({});
    };

    const onApply = async (jobId: number) => {
        const userID = sessionStorage.getItem("userID");

        if (!userID) {
            alert("Please log in to apply for jobs.");
            return;
        }
        await applyForJob(jobId, userID)
    }



    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }

        let navigationPanelItem = [];
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            navigationPanelItem.push(
                <li
                    key={pageNumber}
                    className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                        }}
                    >
                        {pageNumber}
                    </button>
                </li>
            );
        }
        return (
            <nav aria-label="Job search pagination">
                <ul className="pagination justify-content-center mt-3">
                    {navigationPanelItem}
                </ul>
            </nav>
        );
    };

    return (
        <Container fluid={true} className="pt-4 pb-4 job-search-panel">
            {jobs.length > 0 ? (
                generateJobCards()
            ) : (
                <p className="text-center">No jobs found.</p>
            )}
            {renderPagination()}
        </Container>
    );
}
