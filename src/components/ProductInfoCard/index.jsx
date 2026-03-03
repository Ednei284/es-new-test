import { FaWhatsapp } from "react-icons/fa";
import { Divider2 } from "../Divider";
import { LogProductClick } from "../ClickLogger";
import styles from "./styles.module.css";
import ImageSlider from "../ImageSlider";

export function ProductInfoCard({ product, vendorName, whatsAppLink }) {
  if (!product) {
    return null; // Não renderiza nada se o produto não for encontrado
  }
  // parseFloat(price) = price.toFixed(2).replace(".", ",")
  const whatsappMessage = `Olá%20${vendorName}%20gostaria%20de%20falar%20sobre%20${product.title}%20no%20valor%20de%20R$${product.price}%20que%20vi%20na%20loja%20virtual%20Coopera%20Mogi.`;

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <ImageSlider images={product.images} alternativeText={product.title} className={styles.productImage} />
      </div>



      <div className={styles.infoContainer}>
        <p className={styles.detailsLabel}>Detalhes</p>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.specs}>
          {product.quantity && <p>Quantidade em estoque: {product.quantity}</p>}
        </div>

        <div className={styles.priceSection}>
          <p className={styles.price}>
            preço R${product.price}
          </p>
          <Divider2 />
        </div>

        <div className={styles.actions}>
          {/* <LogProductClick
            title={title}
            productId={id}
            vendorId={vendor_id}
            categoryId={category_id}
            price={price}
            url="product"
          > */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/${whatsAppLink}?text=${whatsappMessage}`}
            className={`${styles.whatsAppButton} button`}
          >
            <FaWhatsapp /> Falar com {vendorName}
          </a>
          {/* </LogProductClick> */}
        </div>
      </div>
    </div>
  );
}
