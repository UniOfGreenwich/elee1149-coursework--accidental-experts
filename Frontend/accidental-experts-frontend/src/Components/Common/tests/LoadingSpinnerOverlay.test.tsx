import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinnerOverlay from '../LoadingSpinnerOverlay';

describe('LoadingSpinnerOverlay Component', () => {
    test('renders the overlay and spinner', () => {
        render(<LoadingSpinnerOverlay />);

        // Check if the overlay is rendered
        const overlayElement = screen.getByTestId('overlay');
        expect(overlayElement).toBeInTheDocument();

        // Check if the spinner is rendered
        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();
    });
});