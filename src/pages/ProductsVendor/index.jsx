import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { ClickLogger } from "../../components/ClickLogger";
import { Divider3 } from "../../components/Divider";
import { NavInter } from "../../components/NavInter";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../assets/services/api";
import ImageSlider from "../../components/ImageSlider";

export function ProductsVendor() {
  const { vendor_name, vendor_id } = useParams("");
  const [dataVendors, setDataVendors] = useState([])
  const [dataProducts, setDataProducts] = useState([])

  useEffect(() => {
    async function loadData() {
      await api.post('/vendor-id', { id: parseInt(vendor_id) }).then(response => setDataVendors(response.data)).catch(error => {
        console.error('Erro na requisição :', error);
      });
      await api.post('/product-all-id', { vendorId: parseInt(vendor_id) }).then(response => setDataProducts(response.data)).catch(error => {
        console.error('Erro na requisição :', error);
      });
    }
    loadData();
  }, [])

  if (!dataVendors || dataVendors.length === 0) return <p>Carregando...</p>;
  if (!dataProducts || dataProducts.length === 0) return <p>Sem produtos para {vendor_name}...</p>;
  return (
    <section id="products" className={styles.sectionProducts}>
      <div className={`${styles.productHeader} `}>
        <NavInter path="/empreendimentos" name={'Empreendimentos'} />
        <Link
          to={`/${vendor_name}/${vendor_id.toString()}/detalhes`}
        >
          {dataVendors && dataVendors.map(vendor => (
            <ClickLogger
              key={vendor.id}
              id={vendor.id}
              url='/vendor/update-click-vendor'
            >

              <Divider3>
                <ImageSlider images={vendor?.profilePhoto} alternativeText={vendor?.name} />
              </Divider3>
              <p>{vendor?.name}</p>
            </ClickLogger>
          ))
          }
        </Link>
      </div>

      <div className={styles.productCard}>
        {dataProducts.length > 0 && dataProducts.map((product, idx) =>
          <div
            key={idx}
          >
            <Card products={product} vendor_name={vendor_name} vendor_id={vendor_id} />
          </div>
        )
        }
      </div>
    </section>
  );
}
