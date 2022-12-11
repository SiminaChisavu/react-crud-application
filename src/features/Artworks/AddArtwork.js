import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import clsx from 'clsx';

import styles from './Artworks.module.css';

export function AddArtwork() {
  const [values, setValues] = useState({
    artist: '',
    title: '',
    country: '',
    year: '',
    details: '',
    style: '',
    material: '',
    poster: '',
  });

  const [errors, setErrors] = useState({
    artist: '',
    title: '',
    country: '',
    year: '',
    details: '',
    style: '',
    material: '',
    poster: '',
    subject: '',
  });

  const [subject, setCheckBoxValue] = useState('');

  const [message, setMessage] = useState('');

  const { accessToken, user } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleCheckBox() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    let arr = [];

    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        arr.push(checkbox.value);
      } else {
        arr.filter((checkbox) => checkbox !== checkbox.value);
      }
      const checkboxValues = arr.toString();
      setCheckBoxValue(checkboxValues);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values, subject);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setMessage('');
      return;
    }

    await fetch('http://localhost:3001/artworks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, subject, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The artwork was added successfully!');
  }

  return (
    <div className={styles.addArtwork}>
      <h1 className={styles.addArtHeader}>Add artwork</h1>
      <form className={styles.addForm} onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          {message && <p className={styles.successMsj}>{message}</p>}
          <p>
            <label htmlFor="artist">Artist:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.artist,
              })}
              type="text"
              name="artist"
              id="artist"
              value={values.artist}
              onChange={handleInputChange}
            />
          </p>
          {errors.artist && <p className={styles.invalid}>{errors.artist}</p>}
          <p>
            <label htmlFor="title">Title:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.title,
              })}
              type="text"
              name="title"
              id="title"
              value={values.title}
              onChange={handleInputChange}
            />
          </p>
          {errors.title && <p className={styles.invalid}>{errors.title}</p>}
          <p>
            <label htmlFor="country">Country:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.country,
              })}
              type="text"
              name="country"
              id="country"
              value={values.country}
              onChange={handleInputChange}
            />
          </p>
          {errors.country && <p className={styles.invalid}>{errors.country}</p>}
          <p>
            <label htmlFor="year">Year:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.year,
              })}
              type="number"
              name="year"
              id="year"
              value={values.year}
              onChange={handleInputChange}
            />
          </p>
          {errors.year && <p className={styles.invalid}>{errors.year}</p>}
          <p>
            <label htmlFor="details">Details:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.details,
              })}
              type="text"
              name="details"
              id="details"
              value={values.details}
              onChange={handleInputChange}
            />
          </p>
          {errors.details && <p className={styles.invalid}>{errors.details}</p>}
          <p>
            <label htmlFor="style">Style:</label>
            <select
              className={clsx(styles.valid, {
                [styles.invalid]: errors.style,
              })}
              name="style"
              value={values.style}
              id="style"
              onChange={handleInputChange}
            >
              <option hidden value="">
                Please select an option
              </option>
              <option value="Ancient Art">Ancient Art</option>
              <option value="Medieval Art">Medieval Art</option>
              <option value="Mannerism">Mannerism</option>
              <option value="Baroque">Baroque</option>
              <option value="Classical Art">Classical Art</option>
              <option value="Art Deco">Art Deco</option>
              <option value="Hyperrealism">Hyperrealism</option>
              <option value="Contemporary Art">Contemporary Art</option>
              <option value="Geometric Art">Geometric Art</option>
            </select>
          </p>
          {errors.style && <p className={styles.invalid}>{errors.style}</p>}
          <p>
            <label htmlFor="material">Material:</label>
            <select
              className={clsx(styles.valid, {
                [styles.invalid]: errors.material,
              })}
              value={values.material}
              name="material"
              id="material"
              onChange={handleInputChange}
            >
              <option hidden value="">
                Please select an option
              </option>
              <option value="Bronze">Bronze</option>
              <option value="Marble">Marble</option>
              <option value="Parian">Parian</option>
              <option value="Porcelain">Porcelain</option>
              <option value="Steel">Steel</option>
            </select>
          </p>
          {errors.material && (
            <p className={styles.invalid}>{errors.material}</p>
          )}
          <p>
            <span>Select subject:</span>
            <span className={styles.checkboxes}>
              <label className={styles.forSbjct} htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Ancient"
                  onChange={handleCheckBox}
                />
                Ancient
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Biblical"
                  onChange={handleCheckBox}
                />
                Biblical
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Greek"
                  onChange={handleCheckBox}
                />
                Greek
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Figurative"
                  onChange={handleCheckBox}
                />
                Figurative
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Portrait"
                  onChange={handleCheckBox}
                />
                Portrait
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Man"
                  onChange={handleCheckBox}
                />
                Man
              </label>
              <label htmlFor="subject">
                <input
                  type="checkbox"
                  id="subject"
                  name="subject"
                  value="Woman"
                  onChange={handleCheckBox}
                />
                Woman
              </label>
            </span>
          </p>
          <p>
            <label htmlFor="poster">Image:</label>
            <input
              className={clsx(styles.valid, {
                [styles.invalid]: errors.poster,
              })}
              type="text"
              name="poster"
              id="poster"
              value={values.poster}
              onChange={handleInputChange}
            />
          </p>
          {errors.poster && <p className={styles.invalid}>{errors.poster}</p>}
          <p className={styles.addBtn}>
            <button className="rounded bg-teal-500 text-teal-900 px-2 py-1 cursor-pointer">
              Add artwork
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

function validateForm(values, subject) {
  const validation = {
    errors: {
      artist: '',
      title: '',
      country: '',
      year: '',
      details: '',
      style: '',
      material: '',
      poster: '',
      subject: '',
    },
    isValid: true,
  };
  if (!values.artist) {
    validation.errors.artist = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.title) {
    validation.errors.title = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.country) {
    validation.errors.country = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.year) {
    validation.errors.year = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.details) {
    validation.errors.details = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.poster) {
    validation.errors.poster = 'All fields are required.';
    validation.isValid = false;
  }

  if (!subject) {
    validation.errors.subject = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.material) {
    validation.errors.material = 'All fields are required.';
    validation.isValid = false;
  }

  if (!values.style) {
    validation.errors.style = 'All fields are required.';
    validation.isValid = false;
  }

  return validation;
}
