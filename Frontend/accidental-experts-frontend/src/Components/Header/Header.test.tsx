import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { RoutesContext } from '../../RoutesContext';

jest.mock('../../RoutesContext.tsx', () => ({
    useRoutes: () => ({
        homePath: '/mock-home',
        jobSearchPath: '/mock-search',
        loginAndRegistrationPath: '/mock-login',
        employerDashboardPath: '/mock-employer',
    }),
    RoutesContext: { Provider: ({ children }) => <>{children}</> },
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

beforeEach(() => {
    sessionStorage.clear();
    mockedNavigate.mockClear();
});

describe('Header Component', () => {
    test('renders logo and website name', () => {
        const { getByAltText, getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(getByAltText('Accidentally Unemployed Logo')).toBeInTheDocument();
        expect(getByText('AccidentallyUnemployed')).toBeInTheDocument();
    });

    test('renders login and signup links when user is not logged in', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const loginLink = getByText('Log in');
        const signupLink = getByText('Sign up');

        expect(loginLink).toBeInTheDocument();
        expect(signupLink).toBeInTheDocument();

        expect(loginLink.closest('a')).toHaveAttribute('href', '/mock-login');
        expect(signupLink.closest('a')).toHaveAttribute('href', '/mock-login');
    });

    test('renders welcome message and logout button when user is logged in', () => {
        sessionStorage.setItem('userID', 'user123');
        sessionStorage.setItem('firstName', 'Tester');

        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(getByText('Welcome, Tester')).toBeInTheDocument();
        expect(getByText('Logout')).toBeInTheDocument();
    });

    test('clears sessionStorage and navigates on logout', () => {
        sessionStorage.setItem('userID', 'user123');
        sessionStorage.setItem('firstName', 'Tester');

        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logoutButton = getByText('Logout');
        fireEvent.click(logoutButton);

        expect(sessionStorage.getItem('userID')).toBeNull();
        expect(sessionStorage.getItem('firstName')).toBeNull();

        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    test('renders main navigation links', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const homeLink = getByText('Home');
        const searchLink = getByText('Job Search');

        expect(homeLink).toBeInTheDocument();
        expect(searchLink).toBeInTheDocument();

        expect(homeLink.closest('a')).toHaveAttribute('href', '/mock-home');
        expect(searchLink.closest('a')).toHaveAttribute('href', '/mock-search');
    });
});