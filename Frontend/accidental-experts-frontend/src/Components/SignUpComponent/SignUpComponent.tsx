import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './signUpComponent.scss';
import { registerNewUser, retrieveAccountInfo } from '../../dataGateway.ts';
import { useNavigate } from 'react-router-dom';
import LoadingSpinnerOverlay from '../Common/LoadingSpinnerOverlay';
import ResponseModal from '../Common/ResponseModal';

type Inputs = {
    email: string;
    firstName: string;
    surname: string;
    password: string;
    passwordCheck: string;
    userType: string;
};

type ResponseStatus = 'idle' | 'success' | 'error';
const SignupComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      
    } = useForm<Inputs>({
        defaultValues: {
            userType: 'job_seeker',
        },
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [responseStatus, setResponseStatus] =
        React.useState<ResponseStatus>('idle');
    const [responseMessage, setResponseMessage] = React.useState<string>('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setResponseStatus('idle');
        setResponseMessage('');
        try {
            const registrationResponse = await registerNewUser(
                data.password,
                data.email,
                data.firstName,
                data.surname,
                data.userType
            );

            const newUserId = registrationResponse?.id;
            if (!newUserId) {
                throw new Error(
                    'Registration response did not contain a user ID.'
                );
            }

            sessionStorage.setItem('userID', newUserId.toString());

            const accountInfoResponse = await retrieveAccountInfo(
                newUserId.toString()
            );
            const profile = accountInfoResponse.profile;
            sessionStorage.setItem('firstName', profile.firstName);
            sessionStorage.setItem('lastName', profile.lastName);
            sessionStorage.setItem('userType', profile.userType);

            navigate('/');
        } catch (error: any) {
            console.error('Signup Error:', error);
            setResponseMessage(
                'Registration failed. Please try again. Your email may already be in use.'
            );
            setResponseStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setResponseStatus('idle');
        setResponseMessage('');
    };

    const password = watch('password');
    const userType = watch('userType', 'job_seeker');

    return (
        <div className="SignupComponentWrapper">
            <h2>Register today</h2>
            <div className="signupFormWrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={'emailInput'}
                        placeholder={'Email'}
                        type="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span>Email is required</span>}
                    <input
                        className={'firstNameInput'}
                        placeholder={'First Name'}
                        type="text"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && <span>First Name is required</span>}
                    <input
                        className={'surnameInput'}
                        placeholder={'Surname'}
                        type="text"
                        {...register('surname', { required: true })}
                    />
                    {errors.surname && <span>Surname is required</span>}
                    <input
                        className={'passwordInput'}
                        placeholder={'Password'}
                        type="password"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span>Password is required</span>}
                    <input
                        className={'passwordCheckInput'}
                        placeholder={'Re-enter Password'}
                        type="password"
                        {...register('passwordCheck', {
                            required: true,
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.passwordCheck && (
                        <span>{errors.passwordCheck.message}</span>
                    )}

                    <div className="sliderWrapper">
                        <label className="sliderLabel">I am a:</label>
                        <div className="slider">
                            <input
                                type="radio"
                                id="job_seeker"
                                value="job_seeker"
                                {...register('userType', { required: true })}
                                defaultChecked
                                disabled={isLoading}

                            />
                            <label htmlFor="job_seeker">Job Seeker</label>
                            <input
                                type="radio"
                                id="recruiter"
                                value="employer"
                                {...register('userType', { required: true })}
                            />
                            <label htmlFor="recruiter">Recruiter</label>
                            <div
                                className={`sliderControl ${userType === 'recruiter' ? 'recruiter' : 'job_seeker'}`}
                            ></div>
                        </div>
                        {errors.userType && <span>User type is required</span>}
                    </div>

                    <input
                        className={'submitFormButton'}
                        type="submit"
                        value="Sign Up"
                    />
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;
