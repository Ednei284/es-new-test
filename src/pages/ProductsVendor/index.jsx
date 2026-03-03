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
  const [dataVendors, setDataVendors] = useState(null)
  const [dataProducts, setDataProducts] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const vRes = await api.post('/vendor-id', { id: parseInt(vendor_id) });
        // Se a API retorna um array, use vRes.data[0]
        setDataVendors(vRes.data);

        const pRes = await api.post('/product-all-id', { vendorId: parseInt(vendor_id) });
        setDataProducts(pRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    loadData();
  }, [])

  if (!dataVendors) return <p>Carregando...</p>;
  return (
    <section id="products" className={styles.sectionProducts}>
      <div className={`${styles.productHeader} `}>
        <NavInter path="/empreendimentos" name={vendor_name} />
        <Link
          to={`/${vendor_name}/${vendor_id.toString()}/detalhes`}
        >
          {dataVendors && dataVendors.id && (
            <ClickLogger
              id={dataVendors.id}
              url='/vendor/update-click-vendor'
            >

              <Divider3>
                <ImageSlider images={dataVendors?.profilePhoto} alternativeText={dataVendors?.name} />
              </Divider3>
              <p>{dataVendors?.name}</p>
            </ClickLogger>
          )
          }
        </Link>
      </div>

      <div className={styles.productCard}>
        {dataProducts.length > 0 && dataProducts.map((product, idx) =>
          <div
            key={idx}
          >
            <Link
              to={`/${vendor_name}/${vendor_id.toString()}/${product.title}/${product.id}`}
            >
              <ClickLogger
                id={vendor_id}
                productId={product.id}
                url='/product/update-click-product'
              >
                <Card products={product} />
              </ClickLogger>
            </Link>
          </div>
        )
        }
      </div>
    </section>
  );
}
