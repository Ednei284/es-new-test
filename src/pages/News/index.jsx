import styles from './styles.module.css';
import data from '../../assets/data/data-news/datanews.json'
import { Divider1, Divider2 } from '../../components/Divider';

export function News() {
    return (
        <section id="noticias" className={styles.bgWhite}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.subtitle}>Notícias</h2>
                </header>
                <div style={{ position: 'relative' }}>
                    <Divider2></Divider2>

                    {data.news.map((item) => (
                        <div key={item.id} >

                            <img className={styles.imgNews} src={item.avatar} alt={item.alternative} />
                            <blockquote className={styles.quote}>
                                <h1 className={styles.title}>{item.title}</h1>
                                <h3> {item.call}</h3>
                                <p className={styles.quoteText}>
                                    {item.text}
                                </p>
                                <cite className={styles.cite}>
                                    <div>
                                        <span className={styles.author}>{item.author}</span>
                                        <span className={styles.role}>{item.role}</span>
                                    </div>
                                </cite>
                            </blockquote>
                            <a href={item.url} className={`${styles.buttonNews} button`} target="_blank" rel="noopener noreferrer">Saiba mais
                            </a>
                            <Divider2></Divider2>
                        </div>

                    ))}
                </div>

            </div>

        </section >
    );
}