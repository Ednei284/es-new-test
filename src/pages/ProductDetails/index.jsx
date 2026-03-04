import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { NavInter } from "../../components/NavInter";
import { useEffect } from "react";
import api from "../../assets/services/api";
import { useState } from "react";
import { ProductInfoCard } from "../../components/ProductInfoCard";

export function ProductDetails() {
  const { vendor_name, vendor_id, product_name, product_id } =
    useParams("");
  const [dataProducts, setDataProducts] = useState([])
  const [dataVendors, setDataVendors] = useState([])
  useEffect(() => {
    async function loadVendors() {
      await api.post('/vendor-id', { id: parseInt(vendor_id) })
        .then(response => 
          setDataVendors(response.data) 
        )
        .catch(error => {
          console.error('Erro na requisição /vendor-id:', error);
        });
    }
    loadVendors()
  }, [vendor_id])
  useEffect(() => {
    async function loadVendors() {
      await api.post('/product-one-id', {
        id: product_id,
        vendorId: vendor_id,
      })
        .then(response => 
          setDataProducts(response.data)
        )
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    loadVendors()
  }, [vendor_id, product_id])

  const whatsAppLink = dataVendors.whatsapp || ""

  // Se o produto não for encontrado, exibe uma mensagem amigável.
  if (dataProducts !== null && dataProducts.length === 0) {
    return (
      <section className={styles.sectionProducts}>
        <div className={styles.productHeader}>
          <h2>Produto não encontrado</h2>
          <Link className="button" to={`/${vendor_name}/${vendor_id}`}>
            Voltar para {vendor_name}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className={styles.sectionProducts}>
      <div className={styles.productMain}>

        {
          dataProducts &&


          <ProductInfoCard product={dataProducts} vendorName={vendor_name} whatsAppLink={whatsAppLink} />
        }

      </div>
      <NavInter
        path={`/${vendor_name}/${vendor_id}`}
        name={vendor_name}
      />
    </section>
  );
}
