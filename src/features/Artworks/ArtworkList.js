import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtworkCard } from './ArtworkCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Artworks.module.css';

export function ArtworkList() {
  const { page } = useParams();
  const [artworks, setArtworks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/artworks?_page=${page}&_limit=4`)
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, [page]);

  if (!artworks) {
    return <strong>Loading ...</strong>;
  }

  const p = Number(page);

  const nextPage = () => {
    p + 1 === 6 ? navigate('/artworks/1') : navigate(`/artworks/${p + 1}`);
  };

  const prevPage = () => {
    p - 1 === 0 ? navigate('/artworks/5') : navigate(`/artworks/${p - 1}`);
  };

  return (
    <div className={styles.artworkList}>
      <h1>Artworks</h1>
      <FontAwesomeIcon
        icon={solid('circle-chevron-left')}
        className={styles.prevBtn}
        onClick={prevPage}
      />
      <section className={styles.contentArtlist}>
        {artworks.map((artwork) => (
          <ArtworkCard
            className={styles.main}
            key={artwork.id}
            artwork={artwork}
          />
        ))}
      </section>
      <FontAwesomeIcon
        icon={solid('circle-chevron-right')}
        className={styles.nextBtn}
        onClick={nextPage}
      />
    </div>
  );
}
