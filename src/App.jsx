import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { AppRoutes } from './routes';
import styles from './App.module.css';
import { useEffect, useState } from 'react'
import { PoliticsTerms } from './pages/PoliticsTerms';
// import { CartButton } from './components/CartButton';
// import { AdBanner } from './components/AdBanner';

export function App() {
  const [isSetedCookies, setIsSetedCookies] = useState(false);

  useEffect(() => {
    const cookieSeted = localStorage.getItem('cookieSeted');
    if (cookieSeted) setIsSetedCookies(cookieSeted);
  }, [isSetedCookies]);

  return (

    <>

      {isSetedCookies !== 'true' && (
        <div className={styles.show}>
          <PoliticsTerms />
        </div>
      )}

      <Header />
      <main className={styles.main}>
        {/* <AdBanner /> */}
        <AppRoutes />
      </main>
      <Footer />
      <BackToTop />
      {/* <CartButton /> */}
    </>


  );
}
