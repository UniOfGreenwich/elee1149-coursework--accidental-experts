import './JobSearchCard.scss';
import React, { JSX, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

interface JobSearchCardProps {
    jobs: any[];
    numOfJobs: number;
}
export default function JobSearchCard(props: JobSearchCardProps): JSX.Element {
    const { jobs, numOfJobs } = props;
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 20;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(numOfJobs / jobsPerPage);

    function generateJobCards() {
        let jobCards = [];
        for (let i = 0; i < currentJobs.length; i++) {
            jobCards.push(
                <Row key={i}>
                    <Col xs={6} md={10} className={'row-control'}>
                        {infoGraphic(currentJobs[i])}
                    </Col>
                </Row>
            );
        }
        return jobCards;
    }

    const infoGraphic = (job: {
        expiry_date: any;
        description: string;
        company_name: string;
        title: string;
        salary: string | number;
        employment_type: string;
    }) => {
        const date = new Date();
        const expiry_date_string = job.expiry_date;
        let expiry_date = new Date(expiry_date_string);
        const difference = expiry_date.getTime() - date.getTime();
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / (60 * 60)) % 24;
        const days = Math.floor(seconds / (60 * 60 * 24));
        const isDescriptionLong = job.description.length > 100;
        const toggleDescription = () => {
            setIsDescriptionExpanded(!isDescriptionExpanded);
        };

        return (
            <Card className={'info-box'}>
                <Card.Body>
                    <Row>
                        <Col>
                            <img
                                className="image rounded-icon"
                                src={process.env.PUBLIC_URL + '/logo512.png'}
                                alt="Company Image"
                            />
                            <span className={'left-padding text-colour'}>
                                {job.company_name}
                            </span>
                        </Col>
                    </Row>
                    <Card.Title className={'card-title text-colour'}>
                        {job.title}
                    </Card.Title>

                    {isDescriptionLong ? (
                        <div
                            onClick={toggleDescription}
                            style={{ cursor: 'pointer' }}
                        >
                            {isDescriptionExpanded ? (
                                <Card.Text className={'card-text text-colour'}>
                                    {job.description}
                                </Card.Text>
                            ) : (
                                <Card.Text className={'card-text text-colour'}>
                                    {job.description.substring(0, 100)}...{' '}
                                </Card.Text>
                            )}
                        </div>
                    ) : (
                        <Card.Text className={'card-text text-colour'}>
                            {job.description}
                        </Card.Text>
                    )}

                    <Row className={'xxx'}>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">
                                <strong>Salary:</strong> £{job.salary}
                            </Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">
                                <strong>Employment Type:</strong>{' '}
                                {job.employment_type}
                            </Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">
                                <strong>Job Posted</strong> {days} days ago
                            </Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">
                                <strong>Applications Close in: </strong> {days}{' '}
                                days {hours} hours and {minutes} minutes
                            </Card.Text>
                        </Col>
                    </Row>
                    <br />
                    <Button
                        className={'rounded-icon button-style'}
                        onClick={onApply}
                    >
                        Apply Now!
                    </Button>
                </Card.Body>
            </Card>
        );
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onApply = () => {
        console.log('Apply button clicked');
        //TODO;
    };

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
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                        }}
                    >
                        {pageNumber}
                    </a>
                </li>
            );
        }
        return (
            <nav>
                <ul className="pagination justify-content-center mt-3">
                    {navigationPanelItem}
                </ul>
            </nav>
        );
    };

    return (
        <Container fluid={true} className="pt-6 pb-6 job-search-panel">
            {generateJobCards()}
            {renderPagination()}
        </Container>
    );
}
