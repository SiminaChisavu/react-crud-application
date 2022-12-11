import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Artworks.module.css';

export function ArtworkDetails() {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/artworks/' + artworkId)
      .then((res) => res.json())
      .then((data) => setArtwork(data));
  }, [artworkId]);

  if (!artwork) {
    return <strong>Loading...</strong>;
  }

  return (
    <div className={styles['card-details']}>
      <div className={styles['card-header']}>
        <h1>{artwork.title}</h1>
        <img
          className={styles['image-poster']}
          src={artwork.poster}
          alt={`${artwork.title} Poster`}
        />
      </div>
      <div className={styles['card-content']}>
        <div>
          <p>
            <strong>Artist: </strong>
            {artwork.artist}
          </p>
          <p>
            {' '}
            <strong>Country: </strong>
            {artwork.country}
          </p>
          <p>
            <strong>Style: </strong> {artwork.style}
          </p>
          <p>
            <strong>Medium: </strong> {artwork.material}
          </p>
          <p>
            <strong>Original created: </strong>
            {artwork.year}
          </p>
        </div>
        <div className={styles['push-right']}>
          <p>{artwork.details}</p>
        </div>
      </div>
    </div>
  );
}
