import styles from "./styles.module.css";
// import dataProducts from "../../assets/data/data-products/dataproducts.json";
// import dataVendors from "../../assets/data/data-vendors/datavendors.json";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { LogClick } from "../../components/ClickLogger";
import { Divider3 } from "../../components/Divider";
import { NavInter } from "../../components/NavInter";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../assets/services/api";


export function ProductsVendor() {
  const { category_name, vendor_name, vendor_id } = useParams("");
  const [dataVendors, setDataVendors] = useState([])
  const [dataProducts, setDataProducts] = useState([])
  useEffect(() => {
    async function loadVendors() {
      await api.post('/vendor-id', { id: parseInt(vendor_id) })
        .then(response => {
          setDataVendors(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição /vendor-id:', error);
        });
    }
    loadVendors()
  }, [])
  useEffect(() => {
    async function loadProducts() {
      await api.post('/product-id', { id: parseInt(vendor_id) })
        .then(response => {
          setDataProducts(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição /product-id:', error);
        });
    }
    loadProducts()
  }, [])
  // console.log('dataProducts', dataProducts);
  // console.log('dataVendors', dataVendors);

  return (
    <section id="products" className={styles.sectionProducts}>
      <div className={`${styles.productHeader} `}>
        <NavInter path="/empreendimentos" name={category_name} />
        <Link
          to={`/${vendor_name}/${vendor_id.toString()}/detalhes`}
        >
          <LogClick
            id={dataVendors.id}
            url='/vendor/update-click-vendor'
          >

            <Divider3>
              <img src={dataVendors.profilePhoto} alt={dataVendors.name} />
            </Divider3>
            <p>{dataVendors.name}</p>
          </LogClick>
        </Link>
      </div>

      <div className={styles.productCard}>
        {dataProducts.map((prod) =>
        (
          <Link
            key={prod.id}
            to={`/${vendor_name}/${vendor_id.toString()}/${prod.title}/${prod.id}`}
          >
            <Card products={prod} />
          </Link>
        ))}
      </div>
    </section>
  );
}
