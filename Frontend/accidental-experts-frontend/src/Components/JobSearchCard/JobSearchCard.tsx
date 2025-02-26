import './JobSearchCard.scss';
import React, {JSX, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

interface JobSearchCardProps {
    jobs: any[];
    numOfJobs: number;
}
export default function JobSearchCard(props: JobSearchCardProps): JSX.Element {

    const { jobs, numOfJobs } = props;
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    function generateJobCards(numOfJobs: number) {

        let jobCards = [];
        for (let i = 0; i < numOfJobs; i++) {
            jobCards.push(
                <Row key={i}>
                    <Col xs={6} md={10} className={"bottom-padding"}>
                        {infoGraphic(jobs[i])}
                    </Col>
                </Row>
            );
        }
        return jobCards;
    }

    const infoGraphic =(job) => {

        const date = new Date();
        const expiry_date_string = job.expiry_date
        let expiry_date = new Date(expiry_date_string);
        const difference = expiry_date.getTime() - date.getTime();
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / (60 * 60)) % 24;
        const days = Math.floor(seconds / (60 * 60 * 24));
        const isDescriptionLong = job.description.length > 100
        const toggleDescription = () => {
            setIsDescriptionExpanded(!isDescriptionExpanded)
        };

        return (
            <Card className={'info-box'}>
                <Card.Body>
                    <Row>
                        <Col>
                            <img
                                className="image rounded-5"
                                src={process.env.PUBLIC_URL + '/logo512.png'}
                                alt="Company Image"
                            />
                            <span className={"left-padding text-colour"}>{job.company_name}</span>
                        </Col>
                    </Row>
                    <Card.Title className={'card-title text-colour'}>{job.title}</Card.Title>

                    {isDescriptionLong ? (
                    <div onClick={toggleDescription} style={{ cursor: 'pointer' }}>
                        {isDescriptionExpanded ? (
                            <Card.Text className={"card-text text-colour"}>{job.description}</Card.Text>
                        ) : (
                            <Card.Text className={"card-text text-colour"}>{job.description.substring(0, 100)}... </Card.Text>
                        )}
                    </div>
                    ) : (
                    <Card.Text className={"card-text text-colour"}>{job.description}</Card.Text>
                    )}

                    <Row className={'xxx'}>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">Salary: £{job.salary}</Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">Employment Type: {job.employment_type}</Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">Job Posted {days} days ago</Card.Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Card.Text className="card-text text-colour">Applications Close in {days} days {hours} hours and {minutes} minutes</Card.Text>
                        </Col>
                    </Row>
                    <br/>
                    <Button className={'rounded-6 button-font button-style'} onClick={onApply}>Apply Now!</Button>
                </Card.Body>
            </Card>
        )
    }

    const onApply = () => {
        //TODO
    };

    return (
        <Container fluid={true} className="pt-6 pb-6 vehicle-selection-panel">
            {generateJobCards(numOfJobs)}
        </Container>
    );
}
