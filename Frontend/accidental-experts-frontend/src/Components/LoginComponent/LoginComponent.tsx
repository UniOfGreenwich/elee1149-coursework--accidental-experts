import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './loginComponent.scss';
import axios from 'axios';
import { login } from '../../dataGateway.ts';

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const LoginComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmit: SubmitHandler<Inputs> = (data) => login(data.password, data.email)

    return (
        <div className="loginComponentWrapper">
            <h2>Sign In</h2>
            <div className="loginFormWrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={'emailInput'}
                        placeholder={'Email'}
                        type="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span>Email is required</span>}
                    <input
                        className={'passwordInput'}
                        placeholder={'Password'}
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span>Password is required</span>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide password' : 'Show password'}
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
                            />
                            Remember Me
                        </label>
                        <a href="/login-and-registration">Forgot Password?</a>
                    </div>
                    <input
                        className={'submitFormButton'}
                        type="submit"
                        value="Sign In"
                    />
                </form>
                <div className="registerButtonWrapper">
                    <p>Need to make an account?</p>
                    <button className={'registerButton'}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
