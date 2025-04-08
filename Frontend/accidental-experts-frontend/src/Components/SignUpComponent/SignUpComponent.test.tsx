import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import * as dataGateway from '../../dataGateway';

jest.mock('../../dataGateway.ts', () => ({
    registerNewUser: jest.fn(),
    retrieveAccountInfo: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
    sessionStorage.clear();
    mockedNavigate.mockClear();
    (dataGateway.registerNewUser as jest.Mock).mockClear();
    (dataGateway.retrieveAccountInfo as jest.Mock).mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});


describe('SignUpComponent', () => {

    test('renders the SignUp form elements', () => {
        const { getByPlaceholderText, getByLabelText, getByRole, getByText } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('First Name')).toBeInTheDocument();
        expect(getByPlaceholderText('Surname')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByPlaceholderText('Re-enter Password')).toBeInTheDocument();
        expect(getByLabelText('Job Seeker')).toBeInTheDocument();
        expect(getByLabelText('Recruiter')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
        expect(getByText('I am a:')).toBeInTheDocument();
    });

    test('shows validation errors for empty fields on submit', async () => {
        const { getByRole, findByText } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        const submitButton = getByRole('button', { name: 'Sign Up' });
        fireEvent.click(submitButton);

        expect(await findByText('Email is required')).toBeInTheDocument();
        expect(await findByText('First Name is required')).toBeInTheDocument();
        expect(await findByText('Surname is required')).toBeInTheDocument();
        expect(await findByText('Password is required')).toBeInTheDocument();
    });

    test('shows password mismatch error', async () => {
         const { getByPlaceholderText, getByRole, findByText } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Re-enter Password'), { target: { value: 'password456' } });

        const submitButton = getByRole('button', { name: 'Sign Up' });
        fireEvent.click(submitButton);

        expect(await findByText('Passwords do not match')).toBeInTheDocument();
    });

    test('calls registerNewUser and retrieveAccountInfo on successful submit', async () => {
        const mockResponseId = 'new-user-123';
        const mockProfile = {
            firstName: 'New',
            lastName: 'User',
            userType: 'job_seeker',
        };
        (dataGateway.registerNewUser as jest.Mock).mockResolvedValue({ id: mockResponseId });
        (dataGateway.retrieveAccountInfo as jest.Mock).mockResolvedValue({ profile: mockProfile });

        const { getByPlaceholderText, getByLabelText, getByRole } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'new@example.com' } });
        fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'New' } });
        fireEvent.change(getByPlaceholderText('Surname'), { target: { value: 'User' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Re-enter Password'), { target: { value: 'password123' } });
        fireEvent.click(getByLabelText('Job Seeker'));

        fireEvent.click(getByRole('button', { name: 'Sign Up' }));

        await waitFor(() => {
            expect(dataGateway.registerNewUser).toHaveBeenCalledTimes(1);
            expect(dataGateway.registerNewUser).toHaveBeenCalledWith(
                'password123',
                'new@example.com',
                'New',
                'User',
                'job_seeker'
            );
        });

        await waitFor(() => {
             expect(sessionStorage.getItem('userID')).toBe(mockResponseId);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockResponseId);
        });

         await waitFor(() => {
             expect(sessionStorage.getItem('firstName')).toBe(mockProfile.firstName);
             expect(sessionStorage.getItem('lastName')).toBe(mockProfile.lastName);
             expect(sessionStorage.getItem('userType')).toBe(mockProfile.userType);
             expect(mockedNavigate).toHaveBeenCalledTimes(1);
             expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('handles registration error', async () => {
        const mockError = new Error('Registration failed');
        (dataGateway.registerNewUser as jest.Mock).mockRejectedValue(mockError);
        const errorSpy = jest.spyOn(console, 'log');

        const { getByPlaceholderText, getByLabelText, getByRole } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'fail@example.com' } });
        fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Fail' } });
        fireEvent.change(getByPlaceholderText('Surname'), { target: { value: 'User' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Re-enter Password'), { target: { value: 'password123' } });
        fireEvent.click(getByLabelText('Recruiter'));

        fireEvent.click(getByRole('button', { name: 'Sign Up' }));

        await waitFor(() => {
            expect(dataGateway.registerNewUser).toHaveBeenCalledTimes(1);
        });

        expect(dataGateway.retrieveAccountInfo).not.toHaveBeenCalled();
        expect(sessionStorage.getItem('userID')).toBeNull();
        expect(mockedNavigate).not.toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalledWith(mockError);
    });

    test('handles retrieveAccountInfo error after registration', async () => {
        const mockResponseId = 'partial-user-456';
        const mockProfileError = new Error('Failed to retrieve profile');
        (dataGateway.registerNewUser as jest.Mock).mockResolvedValue({ id: mockResponseId });
        (dataGateway.retrieveAccountInfo as jest.Mock).mockRejectedValue(mockProfileError);
        const errorSpy = jest.spyOn(console, 'log');

        const { getByPlaceholderText, getByLabelText, getByRole } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'partial@example.com' } });
        fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Partial' } });
        fireEvent.change(getByPlaceholderText('Surname'), { target: { value: 'User' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Re-enter Password'), { target: { value: 'password123' } });
        fireEvent.click(getByLabelText('Job Seeker'));

        fireEvent.click(getByRole('button', { name: 'Sign Up' }));

        await waitFor(() => {
            expect(dataGateway.registerNewUser).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
             expect(sessionStorage.getItem('userID')).toBe(mockResponseId);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockResponseId);
        });

         await waitFor(() => {
             expect(sessionStorage.getItem('firstName')).toBeNull();
             expect(errorSpy).toHaveBeenCalledWith(mockProfileError);
             expect(mockedNavigate).toHaveBeenCalledTimes(1);
             expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('updates slider style based on user type selection', async () => {
        const { getByLabelText, container } = render(
            <BrowserRouter>
                <SignUpComponent />
            </BrowserRouter>
        );

        const jobSeekerRadio = getByLabelText('Job Seeker') as HTMLInputElement;
        const recruiterRadio = getByLabelText('Recruiter') as HTMLInputElement;
        const sliderControl = container.querySelector('.sliderControl');

        expect(jobSeekerRadio.checked).toBe(true);
        expect(recruiterRadio.checked).toBe(false);
        expect(sliderControl).toHaveClass('job_seeker');
        expect(sliderControl).not.toHaveClass('recruiter');

        fireEvent.click(recruiterRadio);

        await waitFor(() => {
            expect(jobSeekerRadio.checked).toBe(false);
            expect(sliderControl).toHaveClass('job_seeker');
            expect(sliderControl).not.toHaveClass('recruiter');
        });

        fireEvent.click(jobSeekerRadio);

        await waitFor(() => {
            expect(recruiterRadio.checked).toBe(false);
            expect(sliderControl).toHaveClass('job_seeker');
            expect(sliderControl).not.toHaveClass('recruiter');
        });
    });

});
