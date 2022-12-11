import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

import styles from './Home.module.css';

export function HomePage() {
  const [dropDown, setdropDown] = useState(false);
  const [btnText, setBtnText] = useState('+');
  return (
    <div className={styles.homePg}>
      <h1 className={styles.title}>Sculpture Space</h1>
      <div className={styles.dropDown}>
        <button
          onClick={() => {
            if (!dropDown) {
              setBtnText('-');
              setdropDown(true);
            } else if (dropDown) {
              setBtnText('+');
              setdropDown(false);
            }
          }}
        >
          {btnText}
        </button>
        {dropDown && (
          <div className={styles.socialMedia}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
