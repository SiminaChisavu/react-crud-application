import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import clsx from 'clsx';

import styles from './Auth.module.css';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
    serverError: '',
  });
  const { login, accessToken } = useAuthContext();

  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  if (accessToken) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    let apiPath = 'register';
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = 'login';
    }

    const data = await fetch(`http://localhost:3001/api/${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }
    login(data);
  }

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.form_container)} onSubmit={handleSubmit}>
        <h1 className={styles.header}>
          {isRegister ? 'Welcome!' : 'Welcome back!'}
        </h1>
        {errors.serverError && (
          <p className={`${styles.invalid} ${styles.serverError}`}>
            {errors.serverError}!
          </p>
        )}
        <p className={clsx(styles.email)}>
          <label htmlFor="email"></label>
          <input
            className={clsx(styles.valid, {
              [styles.invalid]: errors.email,
            })}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
          />
        </p>
        {errors.email && (
          <p className={clsx(styles.errors_email)}>{errors.email}</p>
        )}
        <p className={clsx(styles.password)}>
          <label htmlFor="password"></label>
          <input
            className={clsx(styles.valid, {
              [styles.invalid]: errors.password,
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          />
        </p>
        {errors.password && (
          <p className={clsx(styles.errors_password)}>{errors.password}</p>
        )}

        {isRegister && (
          <>
            <p className={clsx(styles.retype_password)}>
              <label htmlFor="retype_password"></label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.retype_password,
                })}
                type="password"
                name="retype_password"
                id="retype_password"
                placeholder="Retype password"
                value={values.retype_password}
                onChange={handleInputChange}
              />
            </p>
            {errors.retype_password && (
              <p className={clsx(styles.errorsretype_password)}>
                {errors.retype_password}
              </p>
            )}
            <p className={clsx(styles.firstName)}>
              <label htmlFor="firstName"></label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.firstName,
                })}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </p>
            {errors.firstName && (
              <p className={clsx(styles.errors_firstName)}>
                {errors.firstName}
              </p>
            )}
            <p className={clsx(styles.lastName)}>
              <label htmlFor="lastName"></label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.lastName,
                })}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </p>
            {errors.lastName && (
              <p className={clsx(styles.errors_lastName)}>{errors.lastName}</p>
            )}
          </>
        )}
        <p className={clsx(styles.button)}>
          <button>{isRegister ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </section>
  );
}

function validateForm(values, isRegister) {
  const validation = {
    errors: {
      email: '',
      password: '',
      retype_password: '',
      firstName: '',
      lastName: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Email address is required.';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      'Your password must be at least 6 characters long.';
  }

  if (isRegister) {
    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'The two passwords do not match.';
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'First name is required.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = 'Last name is required.';
    }
  }

  return validation;
}
