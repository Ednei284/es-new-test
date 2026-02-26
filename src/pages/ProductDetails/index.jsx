import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { LogClick } from "../../components/ClickLogger";
import { useMemo } from "react";
import { Divider1 } from "../../components/Divider";
import { ProductInfoCard } from "../../components/ProductInfoCard";
import { NavInter } from "../../components/NavInter";
import { useEffect } from "react";
import api from "../../assets/services/api";
import { useState } from "react";

export function ProductDetails() {
  const { category_name, category_id, vendor_name, vendor_id, product_id } =
    useParams("");
  const [dataVendors, setDataVendors] = useState([])
  const [dataProducts, setDataProducts] = useState([])
  useEffect(() => {
    async function loadVendors() {
      await api.get('/vendor-all')
        .then(response => {
          setDataVendors(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    loadVendors()
  }, [])
  useEffect(() => {
    async function loadVendors() {
      await api.get('/product-all')
        .then(response => {
          setDataProducts(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    loadVendors()
  }, [])
  // useMemo é mais eficiente para encontrar dados que não mudam a cada renderização.
  const product = useMemo(() => {
    return dataProducts.find(
      (p) =>
        p.id.toString() === product_id
    );
  }, []);

  const whatsAppLink = useMemo(() => {
    return (
      dataVendors.vendors.find((vendor) => vendor.id.toString() === vendor_id)
        ?.whatsapp_link || ""
    );
  }, [vendor_id]);

  // Se o produto não for encontrado, exibe uma mensagem amigável.
  if (!product) {
    return (
      <section className={styles.sectionProducts}>
        <div className={styles.productHeader}>
          <h2>Produto não encontrado</h2>
          <Link className="button" to={`/categorias`}>
            Voltar para Categorias
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className={styles.sectionProducts}>
      <div className={styles.productMain}>
        <ProductInfoCard
          product={product}
          vendorName={vendor_name}
          whatsAppLink={whatsAppLink}
        />
      </div>
      <NavInter
        path={`/${category_name}/${category_id}/${vendor_name}/${vendor_id}`}
        name={vendor_name}
      />
    </section>
  );
}
