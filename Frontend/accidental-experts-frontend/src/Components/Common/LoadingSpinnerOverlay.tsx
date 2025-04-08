import React from 'react';
import './Styles/LoadingSpinnerOverlay.scss';

const LoadingSpinnerOverlay: React.FC = () => {
    return (
        <div className="overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinnerOverlay;
