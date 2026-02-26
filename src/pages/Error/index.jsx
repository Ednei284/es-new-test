import styles from './styles.module.css'
import erro404 from '/images/erro/erro-404.jpg'
export function Error() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <h2 className={styles.titleerror}>Ops, algo errado não deu certo!</h2>
            <img className={styles.gifimage} src={erro404} alt="erro 404 página não encontrada" />
            <a href="/" className={`${styles.buttonachor} button`}> Voltar </a>
        </div>
    )
}