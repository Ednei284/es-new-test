// import { limitarCaracteres } from "../../assets/services/tools";
import ImageSlider from "../ImageSlider";
import styles from "./styles.module.css";

export function Card({ products }) {
  return (
    <>

      <div className={styles.card} key={products.id}>

        <ImageSlider images={products.images} />

        <h3 className={styles.cardTitle}>{products.title}</h3>
        <p className={styles.cardDescription}>{products.description}</p>
        <p className={styles.cardPrice}>
          R$ {products.price.toFixed(2).replace(".", ",")}
        </p>
      </div>

    </>
  );
}
