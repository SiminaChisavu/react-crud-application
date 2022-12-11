import styles from './Modal.module.css';

export function ModalConditions({ closeModalConditions }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.closeBttn}>
        <button
          onClick={(e) => {
            e.preventDefault();
            closeModalConditions(false);
          }}
        >
          X
        </button>
      </div>
      <div className={styles.header}>
        <h1>TERMS & CONDITIONS</h1>
      </div>
      <div className={styles.body}>
        <p>
          Disclaimer: Sculpture Space endeavor to ensure the accuracy and
          reliability of the information provided, but do not guarantee its
          accuracy and reliability and accept no liability {'('}whether in tort
          or in contract or otherwise{')'} for any loss or damage arising from
          any inaccuracies or omissions. Under no circumstances shall Sculpture
          Space be liable for any loss or damages resulting from the use of the
          information provided on this website. No material contained on this
          website may be modified, copied, transmitted, distributed and/or
          reproduced without Sculpture Space prior written consent. We reserved
          the right to take legal action against any party for any loss or
          damages resulting from modifying, copying, transmitting, distributing
          and/or reproducing any material contained on this website.
        </p>
      </div>
    </div>
  );
}
