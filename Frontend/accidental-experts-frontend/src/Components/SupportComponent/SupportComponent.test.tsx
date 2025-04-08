import React from 'react';
import { render } from '@testing-library/react';
import SeekerSupport from './SupportComponent';

describe('SupportComponent Component', () => {
    test('renders support information correctly', () => {
        const { getByText, container } = render(<SeekerSupport />);

        expect(getByText('Support')).toBeInTheDocument();

        const emailElement = getByText('Email:').closest('strong');
        expect(emailElement).toBeInTheDocument();
        expect(emailElement?.nextSibling?.textContent?.trim()).toBe('no-reply@accidental-experts.co.uk');

        expect(getByText('Address:')).toBeInTheDocument();
        expect(getByText('10 Downing Street', { exact: false })).toBeInTheDocument();
        expect(getByText('City of Westminster', { exact: false })).toBeInTheDocument();
        expect(getByText('London', { exact: false })).toBeInTheDocument();
        expect(getByText('SW1A 2AA', { exact: false })).toBeInTheDocument();

        const containerDiv = container.querySelector('.accountContainer');
        expect(containerDiv).toBeInTheDocument();

        const cardDiv = container.querySelector('.support-card');
        expect(cardDiv).toBeInTheDocument();

        const headerDiv = container.querySelector('.header');
        expect(headerDiv).toBeInTheDocument();
        expect(headerDiv?.textContent).toBe('Support');
    });
});
