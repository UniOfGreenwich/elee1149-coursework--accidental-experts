import React, { useState, FormEvent } from 'react';
import './CreateJobListing.scss';
import LoadingSpinnerOverlay from '../Common/LoadingSpinnerOverlay';
import ResponseModal from '../Common/ResponseModal';

interface JobListingFormData {
    title: string;
    description: string;
    address: string;
    county: string;
    postcode: string;
    salary: string;
    employmentType: string;
    expiryDate: string;
}

type ResponseStatus = 'idle' | 'success' | 'error';

const initialFormData: JobListingFormData = {
    title: '',
    description: '',
    address: '',
    county: '',
    postcode: '',
    salary: '',
    employmentType: 'full-time',
    expiryDate: '',
};

const CreateJobListingForm: React.FC = () => {
    const [formData, setFormData] =
        useState<JobListingFormData>(initialFormData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseStatus, setResponseStatus] =
        useState<ResponseStatus>('idle');
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleModalClose = () => {
        setResponseStatus('idle');
        setResponseMessage('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseStatus('idle');
        setResponseMessage('');

        const employerId = 1;

        const payload: any = {
            ...formData,
            employer_id: employerId,
            salary: formData.salary ? parseFloat(formData.salary) : null,
            expiryDate: formData.expiryDate
                ? new Date(formData.expiryDate).toISOString()
                : null,
        };

        if (payload.county === '') payload.county = null;
        if (payload.postcode === '') payload.postcode = null;
        if (payload.salary === '') payload.salary = null;

        const apiUrl = 'https://backend-744513217594.europe-west1.run.app/jobs';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorData: any = {};
                try {
                    errorData = await response.json();
                } catch (parseError) {
                    console.error('Error parsing error response:', parseError);
                }
                const errorMessage =
                    errorData?.message ||
                    `HTTP error! Status: ${response.status}`;
                throw new Error(errorMessage);
            }

            setResponseMessage('Job listing created successfully!');
            setResponseStatus('success');
            setFormData(initialFormData);
        } catch (error: any) {
            console.error('API Error:', error);
            setResponseMessage(
                error?.message ||
                    'An unexpected error occurred while creating the job listing.'
            );
            setResponseStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="formContainer">
            {isLoading && <LoadingSpinnerOverlay />}
            {responseStatus !== 'idle' && (
                <ResponseModal
                    status={responseStatus}
                    message={responseMessage}
                    onClose={handleModalClose}
                />
            )}
            <form onSubmit={handleSubmit} className="jobForm">
                <div className="formGroup">
                    <label htmlFor="title">
                        Job Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="jobTitleInput"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description">
                        Job Description <span className="required">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="jobDescriptionTextarea"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        disabled={isLoading}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="address">
                        Street Address / Location{' '}
                        <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="addressInput"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="e.g., 123 Main St, Anytown or 'Remote'"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="county">County</label>
                    <input
                        type="text"
                        id="county"
                        name="county"
                        className="countyInput"
                        value={formData.county}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="postcode">Postcode</label>
                    <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        className="postcodeInput"
                        value={formData.postcode}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="salary">Salary (Annual)</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        className="salaryInput"
                        value={formData.salary}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        placeholder="e.g., 50000.00"
                        disabled={isLoading}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="employmentType">
                        Employment Type <span className="required">*</span>
                    </label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        className="employmentTypeSelect"
                        value={formData.employmentType}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">part-time</option>
                        <option value="contract">contract</option>
                        <option value="internship">internship</option>
                    </select>
                </div>

                <div className="formGroup">
                    <label htmlFor="expiryDate">
                        Application Expiry Date{' '}
                        <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        className="expiryDateInput"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <button
                    type="submit"
                    className="submitButton"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Job Listing'}
                </button>
            </form>
        </div>
    );
};

export default CreateJobListingForm;
