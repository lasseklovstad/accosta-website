import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerItem}>Accosta AS</span>
      <Divider />
      <span className={styles.footerItem}>Org.nr. 919 419 113</span>
      <Divider />
      <span className={styles.footerItem}>
        <a href="mailto:post@accosta.no">post@accosta.no</a>
      </span>
      <Divider />
      <span className={styles.footerItem}>tlf: 472 02 192</span>
    </footer>
  );
}

const Divider = () => (
  <span className={`${styles.footerItem} ${styles.divider}`}>|</span>
);
