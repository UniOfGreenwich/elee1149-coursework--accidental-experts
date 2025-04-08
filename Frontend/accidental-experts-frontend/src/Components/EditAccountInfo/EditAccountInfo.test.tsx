import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditAccountInfo from './EditAccountInfo';
import * as dataGateway from '../../dataGateway';

jest.mock('../../dataGateway', () => ({
    saveInformation: jest.fn(),
}));

describe('EditAccountInfo Component', () => {
    const mockAccountInfo = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    };

    beforeEach(() => {
        sessionStorage.setItem('userID', '12345');
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    test('renders the component with initial values', () => {
        render(<EditAccountInfo accountInfo={mockAccountInfo} />);
        expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');
        expect(screen.getByPlaceholderText('Last Name')).toHaveValue('Doe');
        expect(screen.getByPlaceholderText('Email')).toHaveValue('john.doe@example.com');
    });

    test('validates input fields and enables the Save button', () => {
        render(<EditAccountInfo accountInfo={mockAccountInfo} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const saveButton = screen.getByText('Save');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(saveButton).toBeDisabled();
        fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
        expect(saveButton).toBeEnabled();
    });

    test('calls saveInformation when Save button is clicked', () => {
        const mockSaveInformation = jest.spyOn(dataGateway, 'saveInformation');
        render(<EditAccountInfo accountInfo={mockAccountInfo} />);
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockSaveInformation).toHaveBeenCalledWith(
            '12345',
            'John',
            'Doe',
            'john.doe@example.com'
        );
    });
});