import { FaWhatsapp } from "react-icons/fa";
import { Divider2 } from "../Divider";
import { LogProductClick } from "../ClickLogger";
import styles from "./styles.module.css";

export function ProductInfoCard({ product, vendorName, whatsAppLink }) {
  if (!product) {
    return null; // Não renderiza nada se o produto não for encontrado
  }

  const {
    id,
    title,
    description,
    price,
    image,
    quantity,
    vendor_id,
    category_id,
  } = product;

  const whatsappMessage = `Olá%20${vendorName}%20gostaria%20de%20falar%20sobre%20${title}%20no%20valor%20de%20R$${price}%20que%20vi%20na%20loja%20virtual%20Coopera%20Mogi.`;

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.productImage} />
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.detailsLabel}>Detalhes</p>
        <h1 className={styles.productTitle}>{title}</h1>
        <p className={styles.productDescription}>{description}</p>

        <div className={styles.specs}>
          {quantity && <p>Quantidade em estoque: {quantity}</p>}
        </div>

        <div className={styles.priceSection}>
          <p className={styles.price}>
            preço R${price.toFixed(2).replace(".", ",")}
          </p>
          <Divider2 />
        </div>

        <div className={styles.actions}>
          <LogProductClick
            title={title}
            productId={id}
            vendorId={vendor_id}
            categoryId={category_id}
            price={price}
            url="product"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${whatsAppLink}?text=${whatsappMessage}`}
              className={`${styles.whatsAppButton} button`}
            >
              <FaWhatsapp /> Falar com {vendorName}
            </a>
          </LogProductClick>
        </div>
      </div>
    </div>
  );
}
