import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    test('renders the footer wrapper', () => {
        render(<Footer />);
        const footerWrapper = screen.getByTestId('footerWrapper');
        expect(footerWrapper).toBeInTheDocument();
    });

    test('renders the website name', () => {
        render(<Footer />);
        const websiteName = screen.getByText(/Accidentally/i);
        expect(websiteName).toBeInTheDocument();
    });

    test('renders all contact emails', () => {
        render(<Footer />);
        const emails = [
            'no-reply@accidental-experts.co.uk',
            'slawrence@accidental-experts.co.uk',
            'npatel@accidental-experts.co.uk',
            'hgately@accidental-experts.co.uk',
            'jpittman@accidental-experts.co.uk',
        ];
        emails.forEach((email) => {
            const emailElement = screen.getByText(email);
            expect(emailElement).toBeInTheDocument();
        });
    });

    test('renders all links', () => {
        render(<Footer />);
        const links = ['Contact', 'FAQ', 'Help', 'About', 'T&Cs'];
        links.forEach((linkText) => {
            const linkElement = screen.getByText(linkText);
            expect(linkElement).toBeInTheDocument();
        });
    });

    test('renders FAQ content', () => {
        render(<Footer />);
        const faqContent = screen.getByText(/No questions please, thanks./i);
        expect(faqContent).toBeInTheDocument();
    });

    test('renders Help content', () => {
        render(<Footer />);
        const helpContent = screen.getByText(/HELLLPPP!!! can be found here/i);
        expect(helpContent).toBeInTheDocument();
    });

    test('renders About content', () => {
        render(<Footer />);
        const aboutContent = screen.getByText(/About who, what, where, how?/i);
        expect(aboutContent).toBeInTheDocument();
    });

    test('renders T&Cs content', () => {
        render(<Footer />);
        const tAndCsContent = screen.getByText(/Blah, blah, blah./i);
        expect(tAndCsContent).toBeInTheDocument();
    });
});