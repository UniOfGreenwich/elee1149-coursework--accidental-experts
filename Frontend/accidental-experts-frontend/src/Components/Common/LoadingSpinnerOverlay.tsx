import React from 'react';
import './Styles/LoadingSpinnerOverlay.scss';

const LoadingSpinnerOverlay: React.FC = () => {
    return (
        <div className="overlay" data-testid="overlay">
            <div className="spinner" data-testid="spinner"></div>
        </div>
    );
};

export default LoadingSpinnerOverlay;
