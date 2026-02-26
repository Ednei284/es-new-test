import styles from './styles.module.css';
import photoLogo from '/images/logo/coopera-mogi-logo-1.png'
export function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <img className={styles.imglogo} src={photoLogo} alt="logo da coopera mogi" />
    </a>
  );
}