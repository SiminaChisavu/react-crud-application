import { Link } from 'react-router-dom';

import styles from './Artworks.module.css';

export function ArtworkCard({ artwork }) {
  return (
    <article className={styles.artworkCard}>
      <Link to={`/artworks/page/${artwork.id}`}>
        <img src={artwork.poster} alt={`${artwork.title} poster`} />
        <h2 className={styles.cardTitle}>{artwork.title}</h2>
      </Link>
    </article>
  );
}
