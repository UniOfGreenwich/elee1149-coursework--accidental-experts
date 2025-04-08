import React from 'react';
import { render } from '@testing-library/react';
import HomePageGoals from './HomePageGoals';

describe('HomePageGoals Component', () => {
    test('renders with correct props', () => {
        const props = {
            heading: 'Test Heading',
            text: 'Test Text',
            imageUrl: 'test-image-url.jpg',
            backGroundColor: 'testBackgroundColor',
        };

        const { getByText, getByAltText, container } = render(
            <HomePageGoals {...props} />
        );

        expect(getByText('Test Heading')).toBeInTheDocument();
        expect(getByText('Test Text')).toBeInTheDocument();
        expect(getByAltText('Home Page Goal')).toHaveAttribute(
            'src',
            'test-image-url.jpg'
        );
        expect(container.firstChild).toHaveClass(
            'homePageGoalsContainer testBackgroundColor'
        );
    });
});
