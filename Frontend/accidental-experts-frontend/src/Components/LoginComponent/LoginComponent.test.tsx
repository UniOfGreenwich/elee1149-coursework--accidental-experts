import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

beforeEach(() => {
    sessionStorage.clear();
    mockedNavigate.mockClear();
    (dataGateway.authenticate as jest.Mock).mockClear();
    (dataGateway.retrieveAccountInfo as jest.Mock).mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});


describe('LoginComponent', () => {
    test('renders the login form elements', () => {
        const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByText('Show password')).toBeInTheDocument();
        expect(getByLabelText('Remember Me')).toBeInTheDocument();
        expect(getByText('Forgot Password?')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    test('shows validation errors for empty fields on submit', async () => {
        const { getByRole, getByText } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        const submitButton = getByRole('button', { name: 'Sign In' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(getByText('Email is required')).toBeInTheDocument();
            expect(getByText('Password is required')).toBeInTheDocument();
        });
    });

    test('toggles password visibility', () => {
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        const passwordInput = getByPlaceholderText('Password');
        const toggleButton = getByText('Show password');

        expect(passwordInput).toHaveAttribute('type', 'password');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(getByText('Hide password')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(getByText('Show password')).toBeInTheDocument();
    });

    test('calls authenticate and retrieveAccountInfo on successful submit', async () => {
        const mockUserId = 'user-abc';
        const mockProfile = {
            firstName: 'Test',
            lastName: 'User',
            userType: 'tester',
        };
        (dataGateway.authenticate as jest.Mock).mockResolvedValue(mockUserId);
        (dataGateway.retrieveAccountInfo as jest.Mock).mockResolvedValue({ profile: mockProfile });

        const { getByPlaceholderText, getByRole } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
            expect(dataGateway.authenticate).toHaveBeenCalledWith('password123', 'test@example.com');
        });

        await waitFor(() => {
             expect(sessionStorage.getItem('userID')).toBe(mockUserId);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockUserId);
        });

         await waitFor(() => {
             expect(sessionStorage.getItem('firstName')).toBe(mockProfile.firstName);
             expect(sessionStorage.getItem('lastName')).toBe(mockProfile.lastName);
             expect(sessionStorage.getItem('userType')).toBe(mockProfile.userType);
             expect(mockedNavigate).toHaveBeenCalledTimes(1);
             expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
    });

     test('handles authentication error', async () => {
        const mockError = new Error('Authentication failed');
        (dataGateway.authenticate as jest.Mock).mockRejectedValue(mockError);
        const errorSpy = jest.spyOn(console, 'log');

        const { getByPlaceholderText, getByRole } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
            expect(dataGateway.retrieveAccountInfo).not.toHaveBeenCalled();
            expect(sessionStorage.getItem('userID')).toBeNull();
            expect(mockedNavigate).not.toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalledWith(mockError);
        });
     });

     test('handles retrieveAccountInfo error', async () => {
        const mockUserId = 'user-abc';
        const mockError = new Error('Failed to retrieve profile');
        (dataGateway.authenticate as jest.Mock).mockResolvedValue(mockUserId);
        (dataGateway.retrieveAccountInfo as jest.Mock).mockRejectedValue(mockError);
        const errorSpy = jest.spyOn(console, 'log');

        const { getByPlaceholderText, getByRole } = render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(dataGateway.authenticate).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
             expect(sessionStorage.getItem('userID')).toBe(mockUserId);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledTimes(1);
             expect(dataGateway.retrieveAccountInfo).toHaveBeenCalledWith(mockUserId);
             expect(sessionStorage.getItem('firstName')).toBeNull();
             expect(errorSpy).toHaveBeenCalledWith(mockError);
             expect(mockedNavigate).toHaveBeenCalledTimes(1);
             expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
     });
});
