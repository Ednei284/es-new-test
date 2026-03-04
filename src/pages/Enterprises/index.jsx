import styles from "./styles.module.css";
import { AllVendorsByCategory } from "../../components/AllVendorsByCategory/AllVendorsByCategory";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import api from "../../assets/services/api";
import { ClickLogger } from "../../components/ClickLogger";

const productPerPage = 36;

export function Enterprises() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dataVendors, setDataVendors] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);


  // Estado do preço modificado para facilitar o uso com Select
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState("");
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
  const prices = dataProducts.map((p) => p.price);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  // Filtro de produtos
  const filteredProducts = dataProducts
    .filter((product) => {
      const productByVendor = dataVendors.find(v => v.id === product.vendorId);
      const VendorCategory = productByVendor?.categoryName
      const inCategory =
        selectedCategory === "all" ||
        VendorCategory?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
      const inPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inTitle =
        selectedTitle === "" ||
        product.categoryName.toLowerCase().includes(selectedTitle.toLowerCase());
      return inCategory && inPrice && inTitle;
    })
    .sort((a, b) => a.price - b.price);

  // Gera ranges de preço
  const step = 50;
  const ranges = [];
  let start = 0;
  while (start < maxPrice) {
    let end = Math.min(start + step, maxPrice);
    ranges.push([start, end]);
    start = end;
  }

  // Conta títulos duplicados
  const titleCount = {};
  dataProducts.forEach((product) => {
    titleCount[product.categoryName] = (titleCount[product.categoryName] || 0) + 1;
  });

  const allowedTitles = Object.entries(titleCount)
    .filter(([title, count]) => count > 1)
    .map(([title]) => title);

  const totalPages = Math.ceil(filteredProducts.length / productPerPage);
  const startIdx = (currentPage - 1) * productPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + productPerPage,
  );

  return (
    <section className={styles.sectionProducts} id="categorias">
      <h1 className={styles.productsImageCount}>
        A loja da economia solidária de Mogi das Cruzes conta com exatos
        empreendimentos em categorias.
      </h1>

      <AllVendorsByCategory
        vendorsJson={dataVendors}
      />

      <aside className={styles.filters}>
        <h3>Filtrar por</h3>
        <div className={styles.filtersRow}>
          {/* Filtro de Segmentos */}
          <div className={styles.filterGroup}>
            <label>Segmentos</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todas</option>
              {dataVendors.map((v) => (
                <option key={v.id} value={v.categoryName}>
                  {v.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Preços - CONVERTIDO PARA SELECT */}
          <div className={styles.filterGroup}>
            <label>Preços</label>
            <select
              value={`${priceRange[0]}-${priceRange[1]}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split("-").map(Number);
                setPriceRange([min, max]);
                setCurrentPage(1);
              }}
            >
              <option value={`0-${maxPrice}`}>Todos</option>
              {ranges.map(([from, to], idx) => (
                <option key={idx} value={`${from}-${to}`}>
                  {`R$ ${from} a R$ ${to}`}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Título */}
          <div className={styles.filterGroup}>
            <label>Categoria Produto</label>
            <select
              value={selectedTitle}
              onChange={(e) => {
                setSelectedTitle(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Todos</option>
              {allowedTitles.map((title) => (
                <option key={title} value={title}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      <main className={styles.productsSection}>
        <h2 className={styles.titleCategory}>Produtos</h2>
        <p className={styles.productsCount}>
          {filteredProducts.length} produto(s) encontrado(s)
        </p>

        {/* Paginação Superior */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.active : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        <div className={styles.productsGrid}>
          {paginatedProducts.map((product) => {
            const vendor = dataVendors.find((v) => v.id === product.vendorId);
            if (!vendor) return null;

            return (
              <Link
                key={product.id}
                to={`/${vendor.name}/${vendor.id}/${product.title}/${product.id}`}
                className={styles.productLink}
              >
                <ClickLogger
                  id={product.vendorId}
                  productId={product.id}
                  url='/product/update-click-product'
                >
                  <Card products={product} />
                </ClickLogger>

              </Link>
            );
          })}

        </div>

        {/* Paginação Inferior */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.active : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
