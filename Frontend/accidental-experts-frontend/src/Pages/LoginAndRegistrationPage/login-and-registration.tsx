import * as React from 'react';
import LoginComponent from '../../Components/LoginComponent/LoginComponent.tsx';
import SignUpComponent from "../../Components/SignUpComponent/SignUpComponent.tsx";
import "./loginAndRegistrationWrapper.scss";

export default function LoginAndRegistration() {
    return (
        <div className={'loginAndRegistrationWrapper'}>
            <LoginComponent />
            <SignUpComponent />
        </div>
    );
}
