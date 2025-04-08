import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResponseModal from '../ResponseModal';

describe('ResponseModal Component', () => {
    const mockOnClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the modal with success status', () => {
        render(
            <ResponseModal
                status="success"
                message="Operation was successful"
                onClose={mockOnClose}
            />
        );

        const modalContent = screen.getByText('Operation was successful');
        expect(modalContent).toBeInTheDocument();

        const modalElement = screen.getByText('Operation was successful').closest('.modalContent');
        expect(modalElement).toHaveClass('success');
    });

    test('renders the modal with error status', () => {
        render(
            <ResponseModal
                status="error"
                message="An error occurred"
                onClose={mockOnClose}
            />
        );

        const modalContent = screen.getByText('An error occurred');
        expect(modalContent).toBeInTheDocument();

        const modalElement = screen.getByText('An error occurred').closest('.modalContent');
        expect(modalElement).toHaveClass('error');
    });

    test('calls onClose when the overlay is clicked', () => {
        render(
            <ResponseModal
                status="success"
                message="Operation was successful"
                onClose={mockOnClose}
            />
        );

        const overlay = screen.getByText('Operation was successful').closest('.modalOverlay');
        fireEvent.click(overlay!);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside the modal content', () => {
        render(
            <ResponseModal
                status="success"
                message="Operation was successful"
                onClose={mockOnClose}
            />
        );

        const modalContent = screen.getByText('Operation was successful').closest('.modalContent');
        fireEvent.click(modalContent!);

        expect(mockOnClose).not.toHaveBeenCalled();
    });
})