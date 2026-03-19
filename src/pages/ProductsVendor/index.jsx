import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { ClickLogger } from "../../components/ClickLogger";
import { Divider3 } from "../../components/Divider";
import { NavInter } from "../../components/NavInter";
import { useState } from "react";
import { useEffect } from "react";
import ImageSlider from "../../components/ImageSlider";
const baseURL = import.meta.env.VITE_HOST


export function ProductsVendor() {
  const { vendor_name, vendor_id } = useParams("");
  const [dataVendors, setDataVendors] = useState([])
  const [dataProducts, setDataProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const resVendors = await fetch(baseURL + '/vendor-id', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: parseInt(vendor_id) })
        })
        if (resVendors.ok) {
          const data = await resVendors.json();
          setDataVendors(data);
        }
        const resProducts = await fetch(baseURL + '/product-all-id', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorId: parseInt(vendor_id) }),
        })
        if (resProducts.ok) {
          const data = await resProducts.json();
          setDataProducts(data);
        }
      } catch (error) {
        console.error('Erro na requisição :', error);
      }
    }
    fetchData()
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
          <Card key={idx} products={product} vendor_name={vendor_name} vendor_id={vendor_id} />
        )
        }
      </div>
    </section>
  );
}
