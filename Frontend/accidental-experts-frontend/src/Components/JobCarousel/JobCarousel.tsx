import './JobCarousel.scss';
import React, {JSX, useRef, useState} from 'react';
import {Button, Card, Carousel, Col, Container, Image, Row} from 'react-bootstrap';

interface JobCarouselProps {
    accountInfo: any[];

}
export default function JobCarousel(props: JobCarouselProps): JSX.Element {
    const { accountInfo } = props;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Container className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {accountInfo.map((job, i) => (
                    <Carousel.Item key={i}>
                        <div className="carousel-item-content">
                            <h3 className="job-title">{job.title}</h3>
                            <div className="job-details">
                                <p>
                                    <strong>Company:</strong> {job.companyName}
                                </p>
                                <p>
                                    <strong>Description:</strong> {job.description}
                                </p>
                                <p>
                                    <strong>Date Applied:</strong> {job.dateApplied}
                                </p>
                                <p>
                                    <strong>Employment Type:</strong> {job.employment_type}
                                </p>
                                <p>
                                    <strong>Location:</strong> {job.address}, {job.county}, {job.postcode}
                                </p>
                                <p>
                                    <strong>Status:</strong> {job.applicationStatus}
                                </p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};
