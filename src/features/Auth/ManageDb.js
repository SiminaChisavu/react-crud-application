import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

import styles from './User.module.css';

export function ManageDb() {
  const [artworks, setArtworks] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3001/api/artworks')
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, []);

  if (!artworks) {
    return <strong>Loading ...</strong>;
  }

  return (
    <section className={styles.main}>
      <h1>Manage Database</h1>
      {user && (
        <Link to="/managedb/add">
          <FontAwesomeIcon
            icon={solid('circle-plus')}
            className={styles.icon}
          />
          Add Artwork
        </Link>
      )}
      <table className={styles.tableDb}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Change or delete</th>
          </tr>
        </thead>
        {artworks.map((artwork, index) => (
          <tbody key={index}>
            <tr>
              <td>{artwork.id}</td>
              <td>{artwork.artist}</td>
              <td>{artwork.title}</td>
              <td>
                <Link to={`/managedb/edit/${artwork.id}`}>
                  <FontAwesomeIcon
                    icon={solid('pencil')}
                    className={styles.icon}
                  />
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </section>
  );
}
