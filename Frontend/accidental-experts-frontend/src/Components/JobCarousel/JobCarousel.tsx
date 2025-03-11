import './JobCarousel.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, {JSX, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Col, Container, Image, Row} from 'react-bootstrap';
import {SwiperSlide} from "swiper/react"; // Corrected import
import {Swiper} from "swiper/react"; // Corrected import
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules'

import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiStampFill } from "react-icons/pi";
import { MdDescription } from "react-icons/md";
import { CiBatteryFull } from "react-icons/ci";

import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdPending } from "react-icons/md";
interface Job {
    title: string;
    companyName: string;
    description: string;
    dateApplied: string;
    employment_type: string;
    address: string;
    county: string;
    postcode: string;
    applicationStatus: "Pending" | "Unsuccessful" | "Successful"; // Use a union type
}

interface JobCarouselProps {
    accountInfo: Job[];
}

export default function JobCarousel(props: JobCarouselProps): JSX.Element {
    const {accountInfo} = props;

    const selectStatusIcon = (status: string) => {
        if (status === "Pending") {
            return (<MdPending className={"icon"} />);
        } else if (status === "Unsuccessful") {
            return (<ImCross className={"icon"} />);
        } else {
            return (<TiTick className={"icon"} />);
        }
    };

    return (
        <Container className="carousel-container">
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className={"my-swiper"}
            >
                {accountInfo.map((job, i) => (
                    <SwiperSlide key={i}>
                        <div className="swiper-slide-content">
                            <h3 className="job-title">{job.title}</h3>
                            <div className="job-details">
                                <p>
                                    <FaBuilding className={"icon"} />
                                    <strong>Company:</strong> {job.companyName}
                                </p>
                                <p>
                                    <MdDescription className={"icon"} />
                                    <strong>Description:</strong> {job.description}
                                </p>
                                <p>
                                    <PiStampFill className={"icon"} />
                                    <strong>Date Applied:</strong> {job.dateApplied}
                                </p>
                                <p>
                                    <CiBatteryFull className={"icon"} />
                                    <strong>Employment Type:</strong> {job.employment_type}
                                </p>
                                <p>
                                    <FaLocationDot className={"icon"} />
                                    <strong>Location:</strong> {job.address}, {job.county}, {job.postcode}
                                </p>
                                <p>
                                    {selectStatusIcon(job.applicationStatus)}
                                    <strong>Status:</strong> {job.applicationStatus}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}
