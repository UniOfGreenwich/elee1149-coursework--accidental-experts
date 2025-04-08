import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoutes } from '../../RoutesContext';
import LoginComponent from '../../Components/LoginComponent/LoginComponent.tsx';
import SignUpComponent from '../../Components/SignUpComponent/SignUpComponent.tsx';
import './loginAndRegistrationWrapper.scss';

export default function LoginAndRegistration() {
    const navigate = useNavigate();
    const { homePath } = useRoutes();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userID');

        if (userId) {
            console.log('User logged in, redirecting from Login/Registration page...');
            navigate(homePath, { replace: true });
        } else {
            setIsLoading(false);
        }
    }, [navigate, homePath]);

    if (isLoading) {
        return null;
    }

    return (
        <div className={'loginAndRegistrationWrapper'}>
            <LoginComponent />
            <SignUpComponent />
        </div>
    );
}