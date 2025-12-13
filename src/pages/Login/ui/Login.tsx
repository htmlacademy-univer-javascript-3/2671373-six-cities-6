import {FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {login} from '@/shared/store/auth.ts';
import {useAppDispatch} from '@/shared/store';
import {useNavigate} from 'react-router-dom';
import {AxiosResponse} from 'axios';

type TLoginData = {
  email: string;
  password: string;
}

const LoginPage: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, any>>({});

  const { handleSubmit, register } = useForm<TLoginData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submitHandler: SubmitHandler<TLoginData> = (values) => {
    dispatch(login(values)).then((r) => {
      const payload = r.payload as AxiosResponse;
      if ('status' in payload) {
        const errorData = payload.data as {details: {messages: string[]; property: string; value: string}[]};
        const fieldErrors: Record<string, string> = errorData.details.reduce((acc, curr) => {
          acc[curr.property] = curr.messages[0];
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
        return;

      }
      navigate('/');
    });
  };

  return (
    <div className="page page--gray page--login">

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(submitHandler)}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  {...register('email')}
                  className="login__input form__input"
                  type="email"
                  placeholder="Email"
                  required
                />
                {errors['email'] && <p>{errors['email']}</p>}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  {...register('password')}
                  className="login__input form__input"
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors['password'] && <p>{errors['password']}</p>}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
