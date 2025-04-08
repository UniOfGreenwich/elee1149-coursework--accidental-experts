import React from 'react';
import CreateJobListingForm from '../../Components/JobListingForm/CreateJobListingForm.tsx';
import './EmployerDashboardPage.scss';

const EmployerDashboardPage: React.FC = () => {
    return (
        <div className="dashboardContainer">
            <h1>Employer Dashboard</h1>
            <h2>Create New Job Listing</h2>
            <CreateJobListingForm />
        </div>
    );
};

export default EmployerDashboardPage;
