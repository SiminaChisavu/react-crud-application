import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import clsx from 'clsx';

import styles from './User.module.css';

export function EditProfile() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { userId } = useParams();
  const { accessToken } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3001/users/' + userId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, [accessToken, userId]);

  const [message, setMessage] = useState('');

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setMessage('');
      return;
    }

    await fetch('http://localhost:3001/users/' + values.id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage('Your profile was updated succesfully!');
  }

  return (
    <div className={styles.editProfile}>
      <h1>User details</h1>
      <div className={styles.userFormContent}>
        <form className={styles.userForm} onSubmit={handleSubmit}>
          <div className={styles.userContent}>
            {message && <p className={styles.successMsj}>{message}</p>}
            <p>
              <label htmlFor="firstName" className={styles.fName}>
                First name:
              </label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.firstName,
                })}
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </p>
            {errors.firstName && (
              <p className={styles.invalid}>{errors.firstName}</p>
            )}
            <p>
              <label htmlFor="lastName" className={styles.lName}>
                Last name:
              </label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.lastName,
                })}
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </p>
            {errors.lastName && (
              <p className={styles.invalid}>{errors.lastName}</p>
            )}
            <p>
              <label htmlFor="email" className={styles.email}>
                Email:
              </label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.email,
                })}
                type="text"
                name="email"
                id="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </p>
            {errors.email && <p className={styles.invalid}>{errors.email}</p>}
            <p>
              <label htmlFor="password" className={styles.password}>
                Password:
              </label>
              <input
                className={clsx(styles.valid, {
                  [styles.invalid]: errors.password,
                })}
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </p>
            {errors.password && (
              <p className={styles.invalid}>{errors.password}</p>
            )}
            <p>
              <label htmlFor="image">Profile photo: </label>
              <input
                type="text"
                name="image"
                id="image"
                value={values.poster}
                onChange={handleInputChange}
              />
            </p>
            <p className={styles.updateBtn}>
              <button>Update</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function validateForm(values) {
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

  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = 'First name is required.';
  }

  if (!values.lastName) {
    validation.isValid = false;
    validation.errors.lastName = 'Last name is required.';
  }
  return validation;
}
