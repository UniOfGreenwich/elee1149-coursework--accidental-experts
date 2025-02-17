import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={"Email"} type="email" {...register('email', {required: true})} />
                {errors.email && <span>Email is required</span>}
                <input
                    placeholder={"Password"}
                    type={showPassword ? "text" : "password"} {...register('password', {required: true})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password &&
                    <span>Password is required</span>}
                <label>
                    <input type="checkbox" {...register('rememberMe')}
                           style={{display: 'inline-block', marginRight: '5px'}}/>
                    Remember Me
                </label>
                <a href="/login-and-registration">Forgot Password?</a>
                <input type="submit"/>

            </form>
            <div className="separator">
                <div className="separator-line"/>
                <span className="separator-text">or</span>
                <div className="separator-line"/>
            </div>
            <div>
                <button className="google-signin-button">Sign in with Google</button>
            </div>
        </div>
    );
};

export default LoginComponent;
