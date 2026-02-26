import { useState } from 'react';
import styles from './styles.module.css';
import { FaTimes, FaEye } from 'react-icons/fa';

export function AdBanner({ position = 'right' }) {
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(true);
    };

    const handleShow = () => {
        setIsMinimized(false);
    };

    const bannerClasses = ` ${styles.adBanner} ${styles[position]} ${isMinimized ? styles.minimized : ''}`;

    return (
        <div className={bannerClasses}>
            {isMinimized ? (
                <button
                    className={styles.showButton}
                    onClick={handleShow}
                    aria-label="Mostrar propaganda"
                >
                    <FaEye />
                </button>
            ) : (
                <>
                    <button
                        className={styles.closeButton}
                        onClick={handleMinimize}
                        aria-label="Fechar propaganda"
                    >
                        <FaTimes />
                    </button>
                    <a
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://th.bing.com/th/id/OIP.HaDqdHpR2--Czkp8a4tTPAHaEo?w=255&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                            alt="Propaganda"
                        />
                    </a>
                </>
            )}
        </div>
    );
}
