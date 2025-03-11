import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../LoginComponent/loginComponent.scss';

type Inputs = {
    email: string;
    firstName: string;
    surname: string;
    password: string;
    passwordCheck: string;
};

const SignupComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    const password = watch('password');

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
                    {errors.passwordCheck && <span>{errors.passwordCheck.message}</span>}
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