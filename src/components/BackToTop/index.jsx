// components/BackToTop/index.jsx
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './styles.module.css';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <FaArrowUp />
        </button>
    );
}