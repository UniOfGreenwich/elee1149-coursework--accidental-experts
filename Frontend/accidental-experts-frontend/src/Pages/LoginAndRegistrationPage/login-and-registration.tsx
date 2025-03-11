import * as React from 'react';
import LoginComponent from '../../Components/LoginComponent/LoginComponent.tsx';
import SignUpComponent from "../../Components/SignUpComponent/SignUpComponent.tsx";

export default function LoginAndRegistration() {
    return (
        <div>
            <LoginComponent />
            <SignUpComponent />
        </div>
    );
}
