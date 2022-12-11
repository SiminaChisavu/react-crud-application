import { useState } from 'react';
import { ModalConditions } from './Terms.js';
import { ModalPrivacyPolicy } from './PrivacyPolicy.js';

import styles from './Modal.module.css';

export function Footer() {
  const [openModalConditions, setOpenModalConditions] = useState(false);
  const [openModalPrivacyPolicy, setOpenModalPrivacyPolicy] = useState(false);
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.header}>&copy; Sculpture Space 2022</div>
        <div>
          No material contained on this website may be modified, copied,
          transmitted, distributed and/or reproduced without Sculpture Space
          prior written consent.
        </div>
        <div className={styles.footerLinks}>
          <a
            href="/"
            className={styles.openModal}
            onClick={(e) => {
              e.preventDefault();
              setOpenModalConditions(true);
            }}
          >
            Terms & Conditions
          </a>
          <a
            href="/"
            className={styles.openModal}
            onClick={(e) => {
              e.preventDefault();
              setOpenModalPrivacyPolicy(true);
            }}
          >
            Privacy Policy
          </a>
          {openModalConditions && (
            <ModalConditions closeModalConditions={setOpenModalConditions} />
          )}
          {openModalPrivacyPolicy && (
            <ModalPrivacyPolicy closeModalPrivacy={setOpenModalPrivacyPolicy} />
          )}
        </div>
      </div>
    </>
  );
}
