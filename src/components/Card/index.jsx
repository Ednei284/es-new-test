import { Link } from "react-router-dom";
import { caracterLimiter } from "../../assets/services/tools";
import ImageSlider from "../ImageSlider";
import styles from "./styles.module.css";
import { ClickLogger } from "../ClickLogger";

export function Card({ products, vendor_name, vendor_id }) {
  const handleClick = () => {
    window.location.replace(`/${vendor_name}/${vendor_id}/${products.title}/${products.id}`)
  }
  return (
    <>

      <div className={styles.card} key={products.id}>
        <ImageSlider images={products.images} alternativeText={products.title} />
        <h3 className={styles.cardTitle}>{products.title}</h3>

        <p className={styles.cardPrice}>
          R$ {[products.price].toString().replace('.', ',')}
        </p>
        <p className={styles.cardDescription}>{
          <ClickLogger
            id={products.vendorId}
            productId={products.id}
            url='/product/update-click-product'
          >
            <button
              onClick={handleClick}
              className={'button'}
            >
              Detalhes
            </button>
          </ClickLogger>
        }</p>
      </div>

    </>
  );
}
