// components/Footer/index.jsx
import { Logo } from '../Logo';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.css';

export function Footer() {
    return (
        <footer id="footer" className={styles.footer}>
            <div className={`${styles.container} container`}>
                <div className={styles.brand}>
                    <Logo className={styles.logo} />
                    <p className={styles.text}>
                        Um outro mundo é possível.
                    </p>
                </div>

                {/* <div className={styles.social}>
                    <a href="#" aria-label="Facebook" className={styles.socialLink}>
                        <FaFacebook />
                    </a>
                    <a href="#" aria-label="Instagram" className={styles.socialLink}>
                        <FaInstagram />
                    </a>
                    <a href="#" aria-label="Twitter" className={styles.socialLink}>
                        <FaTwitter />
                    </a>
                    <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                        <FaLinkedin />
                    </a>
                </div> */}
            </div>

            {/* <p className={styles.copyright}>
                &copy; {new Date().getFullYear()} All rights reserved.
            </p> */}
        </footer>
    );
}