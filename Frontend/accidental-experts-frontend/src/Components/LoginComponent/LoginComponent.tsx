import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './loginComponent.scss';
import { authenticate, retrieveAccountInfo } from '../../dataGateway.ts';
import { useNavigate } from 'react-router-dom';
import LoadingSpinnerOverlay from '../Common/LoadingSpinnerOverlay';
import ResponseModal from '../Common/ResponseModal';

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type ResponseStatus = 'idle' | 'success' | 'error';

const LoginComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>('idle');
    const [responseMessage, setResponseMessage] = React.useState<string>('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setResponseStatus('idle');
        setResponseMessage('');

        try {
            const userIdResponse = await authenticate(data.password, data.email);
            sessionStorage.setItem('userID', userIdResponse);

            const accountInfoResponse = await retrieveAccountInfo(userIdResponse);
            const profile = accountInfoResponse.profile;
            sessionStorage.setItem('firstName', profile.firstName);
            sessionStorage.setItem('lastName', profile.lastName);
            sessionStorage.setItem('userType', profile.userType);
            navigate('/');

        } catch (error: any) {
            console.error("Login Error:", error);
            setResponseMessage('Login failed. Please check your credentials.');
            setResponseStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setResponseStatus('idle');
        setResponseMessage('');
    };

    return (
        <div className="loginComponentWrapper">
            {isLoading && <LoadingSpinnerOverlay />}
            {responseStatus === 'error' && (
                <ResponseModal
                    status={responseStatus}
                    message={responseMessage}
                    onClose={handleModalClose}
                />
            )}
            <h2>Sign In</h2>
            <div className="loginFormWrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={'emailInput'}
                        placeholder={'Email'}
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        disabled={isLoading}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                        <input
                            className={'passwordInput'}
                            placeholder={'Password'}
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
                            disabled={isLoading}
                        />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    <div className="rememberMe">
                        <label>
                            <input
                                type="checkbox"
                                {...register('rememberMe')}
                                style={{
                                    display: 'inline-block',
                                    marginRight: '5px',
                                }}
                                disabled={isLoading}
                            />
                            Remember Me
                        </label>
                        <a href="/login-and-registration">Forgot Password?</a>
                    </div>
                    <input
                        className={'submitFormButton'}
                        type="submit"
                        value={isLoading ? 'Signing In...' : 'Sign In'}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};
export default LoginComponent;