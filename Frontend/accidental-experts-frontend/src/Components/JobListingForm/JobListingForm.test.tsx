import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateJobListingForm from './CreateJobListingForm';

describe('CreateJobListingForm Component', () => {
    beforeEach(() => {
        // Mock the global fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders all form fields and the submit button', () => {
        render(<CreateJobListingForm />);
        expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Street Address \/ Location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/County/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Postcode/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Salary \(Annual\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Employment Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Application Expiry Date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Job Listing/i })).toBeInTheDocument();
    });

    test('validates required fields', async () => {
        render(<CreateJobListingForm />);
        const submitButton = screen.getByRole('button', { name: /Create Job Listing/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const titleInput = screen.getByLabelText(/Job Title/i);
            expect(titleInput).toBeInvalid();
        });
    });

    test('submits the form with correct data', async () => {
        render(<CreateJobListingForm />);
        fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Software Engineer' } });
        fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Develop and maintain software.' } });
        fireEvent.change(screen.getByLabelText(/Street Address \/ Location/i), { target: { value: 'Remote' } });

        const submitButton = screen.getByRole('button', { name: /Create Job Listing/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Job listing created successfully!/i)).toBeInTheDocument();
        });
    });

    test('displays loading spinner during submission', async () => {
        render(<CreateJobListingForm />);
        fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Software Engineer' } });
        fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Develop and maintain software.' } });
        fireEvent.change(screen.getByLabelText(/Street Address \/ Location/i), { target: { value: 'Remote' } });

        const submitButton = screen.getByRole('button', { name: /Create Job Listing/i });
        fireEvent.click(submitButton);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });
    });

    test('handles API errors gracefully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'API error occurred' }),
            })
        ) as jest.Mock;

        render(<CreateJobListingForm />);
        fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Software Engineer' } });
        fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Develop and maintain software.' } });
        fireEvent.change(screen.getByLabelText(/Street Address \/ Location/i), { target: { value: 'Remote' } });

        const submitButton = screen.getByRole('button', { name: /Create Job Listing/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/API error occurred/i)).toBeInTheDocument();
        });
    });
});