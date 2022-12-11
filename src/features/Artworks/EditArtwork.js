import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Artworks.module.css';

export function EditArtwork() {
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
    poster: '',
  });

  const { artworkId } = useParams();
  const [message, setMessage] = useState('');
  const { accessToken } = useAuthContext();

  // And other hooks for delete items from db

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/artworks/' + artworkId)
      .then((res) => res.json())
      .then((data) => {
        setValues(data);
      });
  }, [artworkId]);

  if (!values) {
    return <strong>Loading...</strong>;
  }

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

    await fetch('http://localhost:3001/artworks/' + values.id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage('The artwork was updated successfully!');
  }

  async function handleDeleteArtwork(e) {
    e.preventDefault();
    await fetch('http://localhost:3001/artworks/' + values.id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    navigate('/managedb');
  }

  return (
    <div className={styles.editArtwork}>
      <div className={styles.editArtHeader}>
        <h1>Edit</h1>
        <FontAwesomeIcon
          icon={solid('trash-can')}
          className={styles.dltIcon}
          onClick={(e) => {
            e.preventDefault();
            setOpenModal(true);
          }}
        />
      </div>
      <form className={styles.editForm} onSubmit={handleSubmit}>
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
          <p>
            <label htmlFor="material">Material:</label>
            <select
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
          <p>
            <button>Edit</button>
          </p>
        </div>
      </form>
      {openModal && (
        <div className={styles.dltModal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete {values.title}?</p>
            <div className={styles.modalBtns}>
              <button onClick={handleDeleteArtwork}>Ok</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function validateForm(values) {
  const validation = {
    errors: {
      artist: '',
      title: '',
      country: '',
      year: '',
      details: '',
      poster: '',
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

  return validation;
}
