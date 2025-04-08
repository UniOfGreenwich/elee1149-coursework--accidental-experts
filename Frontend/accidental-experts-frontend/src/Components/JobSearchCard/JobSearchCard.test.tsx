import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobSearchCard from './JobSearchCard';
import { applyForJob } from '../../dataGateway';

jest.mock('../../dataGateway', () => ({
    applyForJob: jest.fn(),
}));

describe('JobSearchCard Component', () => {
    const mockJobs = [
        {
            id: 1,
            title: 'Software Engineer',
            description: 'Develop and maintain software.',
            address: '123 Main St',
            county: 'Tech County',
            postcode: '12345',
            salary: 60000,
            employmentType: 'full-time',
            postingDate: '2023-10-01',
            expiryDate: '2023-12-01',
        },
        {
            id: 2,
            title: 'Product Manager',
            description: 'Manage product lifecycle.',
            address: '456 Market St',
            county: 'Biz County',
            postcode: '67890',
            salary: 80000,
            employmentType: 'part-time',
            postingDate: '2023-09-15',
            expiryDate: '2023-11-15',
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handles "Apply Now" button click', async () => {
        sessionStorage.setItem('userID', '123');
        render(<JobSearchCard jobs={mockJobs} numOfJobs={2} />);

        // Use getAllByText to find all "Apply Now!" buttons
        const applyButtons = screen.getAllByText('Apply Now!');
        fireEvent.click(applyButtons[0]); // Click the first button

        await waitFor(() => {
            expect(applyForJob).toHaveBeenCalledWith(1, '123'); // Ensure the correct job ID is passed
        });
    });

    test('shows alert if user is not logged in when clicking "Apply Now"', () => {
        window.alert = jest.fn();
        sessionStorage.removeItem('userID');
        render(<JobSearchCard jobs={mockJobs} numOfJobs={2} />);

        // Use getAllByText to find all "Apply Now!" buttons
        const applyButtons = screen.getAllByText('Apply Now!');
        fireEvent.click(applyButtons[1]); // Click the second button

        expect(window.alert).toHaveBeenCalledWith('Please log in to apply for jobs.');
    });
});