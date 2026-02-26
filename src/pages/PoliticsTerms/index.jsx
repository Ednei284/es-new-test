
import { Link } from 'react-router-dom'
import { Politics } from '../Politics'
import styles from './styles.module.css'
import { Cookies } from '../Cookies'
export function PoliticsTerms() {
  function okButton() {
    localStorage.setItem('cookieSeted', true)
    location.href = '/'

  }
  return (
    <>
      <div id="popup" className={styles.popup}>
        <button className={styles.button} onClick={okButton} >Ok</button>
        <p className={styles.paragr}  >

          O <strong>cooperamogi.com.br</strong> coleta informações de navegação do site  e  utiliza
          <Link className={styles.anch} to='/cookies' rel="noopener noreferrer" element={<Cookies />}> cookies</Link> de funcionamento
          .
          Ao continuar usando o <strong>cooperamogi.com.br</strong> você concorda com nossos termos.
          Podendo mudar a qualquer momento com aviso prévio.
          Se tiver alguma dúvida sobre sua privacidade, clique em
          <Link className={styles.anch} to='politicas' rel="noopener noreferrer" element={<Politics />}> saiba mais</Link>.
        </p>
      </div>


    </>
  )
}
