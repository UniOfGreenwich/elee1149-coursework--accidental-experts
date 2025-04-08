import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import * as dataGateway from '../../dataGateway';

jest.mock('../../dataGateway.ts', () => ({
    authenticate: jest.fn(),
    retrieveAccountInfo: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

jest.mock('../Common/LoadingSpinnerOverlay', () => () => <div data-testid="loading-spinner">Loading...</div>);
jest.mock('../Common/ResponseModal', () => ({ message, onClose }: { message: string; onClose: () => void }) => (
    <div data-testid="response-modal">
        <span>{message}</span>
        <button onClick={onClose}>Close Modal</button>
    </div>
));

beforeEach(() => {
    sessionStorage.clear();
    mockedNavigate.mockClear();
    (dataGateway.authenticate as jest.Mock).mockClear();
    (dataGateway.retrieveAccountInfo as jest.Mock).mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LoginComponent', () => {
    const renderComponent = () => render(
        <BrowserRouter>
            <LoginComponent />
        </BrowserRouter>
    );

    test('renders initial login form elements', () => {
        renderComponent();
        expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
        expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument();
        expect(screen.getByLabelText('Remember Me')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('response-modal')).not.toBeInTheDocument();
    });

    test('shows validation errors for empty fields on submit', async () => {
        renderComponent();
        const submitButton = screen.getByRole('button', { name: 'Sign In' });
        fireEvent.click(submitButton);

        expect(await screen.findByText('Email is required')).toBeInTheDocument();
        expect(await screen.findByText('Password is required')).toBeInTheDocument();
        expect(dataGateway.authenticate).not.toHaveBeenCalled();
    });

    test('toggles password visibility', () => {
        renderComponent();
        const passwordInput = screen.getByPlaceholderText('Password');
        const toggleButton = screen.getByRole('button', { name: 'Show' });

        expect(passwordInput).toHaveAttribute('type', 'password');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument();
    });

    test('handles successful login flow', async () => {
        const mockUserId = 'user-123';
        const mockProfile = {
            firstName: 'Test',
            lastName: 'User',
            userType: 'job_seeker',
        };
        (dataGateway.authenticate as jest.Mock).mockResolvedValue(mockUserId);
        (dataGateway.retrieveAccountInfo as jest.Mock).mockResolvedValue({ profile: mockProfile });

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        expect(screen.getByPlaceholderText('Email'));
        expect(screen.getByPlaceholderText('Password'));
        expect(screen.getByRole('button', { name: 'Show' }));
        expect(screen.getByLabelText('Remember Me'));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
            expect(dataGateway.authenticate).toHaveBeenCalledWith('password123', 'test@example.com');
        });

        await waitFor(() => {
            expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
            expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockUserId);
        });

        await waitFor(() => {
            expect(sessionStorage.getItem('userID')).toBe(mockUserId);
            expect(sessionStorage.getItem('firstName')).toBe(mockProfile.firstName);
            expect(sessionStorage.getItem('lastName')).toBe(mockProfile.lastName);
            expect(sessionStorage.getItem('userType')).toBe(mockProfile.userType);
            expect(mockedNavigate).toHaveBeenCalledTimes(1);
            expect(mockedNavigate).toHaveBeenCalledWith('/');
        });

        // Spinner should be gone after navigation (or completion)
        await waitFor(() => {
           expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
        expect(screen.queryByTestId('response-modal')).not.toBeInTheDocument();
    });

    test('handles authentication failure', async () => {
        const mockError = new Error('Authentication failed');
        (dataGateway.authenticate as jest.Mock).mockRejectedValue(mockError);

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
            expect(dataGateway.authenticate).toHaveBeenCalledWith('wrongpassword', 'wrong@example.com');
        });

        expect(dataGateway.retrieveAccountInfo).not.toHaveBeenCalled();
        expect(sessionStorage.getItem('userID')).toBeNull();
        expect(mockedNavigate).not.toHaveBeenCalled();

        // Wait for spinner to disappear and modal to appear
        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
        expect(await screen.findByTestId('response-modal')).toBeInTheDocument();

        expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledWith("Login Error:", mockError);

        expect(screen.getByRole('button', { name: 'Sign In' })).not.toBeDisabled();
        expect(screen.getByPlaceholderText('Email')).not.toBeDisabled();
        expect(screen.getByPlaceholderText('Password')).not.toBeDisabled();

        fireEvent.click(screen.getByRole('button', { name: 'Close Modal' }));
        expect(screen.queryByTestId('response-modal')).not.toBeInTheDocument();
    });

     test('handles retrieveAccountInfo failure after authentication', async () => {
        const mockUserId = 'user-456';
        const mockError = new Error('Failed to retrieve profile');
        (dataGateway.authenticate as jest.Mock).mockResolvedValue(mockUserId);
        (dataGateway.retrieveAccountInfo as jest.Mock).mockRejectedValue(mockError);

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'partial@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'goodpassword' } });
        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
            expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockUserId);
        });

        expect(sessionStorage.getItem('userID')).toBe(mockUserId);
        expect(sessionStorage.getItem('firstName')).toBeNull();
        expect(mockedNavigate).not.toHaveBeenCalled();

        // Wait for spinner to disappear and modal to appear
        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
        expect(await screen.findByTestId('response-modal')).toBeInTheDocument();

        expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledWith("Login Error:", mockError);

        expect(screen.getByRole('button', { name: 'Sign In' })).not.toBeDisabled();
    });
});
