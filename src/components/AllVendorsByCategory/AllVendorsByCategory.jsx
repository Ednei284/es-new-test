import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ClickLogger } from "../ClickLogger";
// Função para embaralhar array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function AllVendorsByCategory({ vendorsJson }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [shuffledVendors, setShuffledVendors] = useState([]);

  const uniqueCategories = useMemo(() => {
    const safeVendors = Array.isArray(vendorsJson) ? vendorsJson : [];
    const categories = safeVendors.map(v => v.categoryName)
    return [...new Set(categories)]
  }, [vendorsJson])
  useEffect(() => {
    let filtered = vendorsJson;
    if (selectedCategory !== "all") {
      filtered = vendorsJson.filter(
        (v) => v.categoryName === selectedCategory,
      );
    }
    setShuffledVendors(shuffle(filtered));
  }, [vendorsJson, selectedCategory]);

  return (
    <section className={styles.sectionAllVendors}>
      <div className={styles.headerRow}>
        <select
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todos empreendimentos</option>
          {uniqueCategories.map((catName, idx) => (
            <option key={idx} value={catName}>
              {catName}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.vendorRowList}>
        {shuffledVendors.map((vendor) =>
          <li className={styles.vendorItem} key={vendor.id}>
            <ClickLogger
              id={vendor.id}
              url='/vendor/update-click-vendor'
            >

              <Link
                to={`/${vendor.name}/${vendor.id}`}
              >
                <img
                  src={vendor.profilePhoto || vendor.alternative_photo}
                  alt={vendor.name}
                  className={styles.imgProfile}
                />
                <div className={styles.vendorName}>{vendor.name}</div>
              </Link>
            </ClickLogger>
          </li>
        )
        }
      </ul>
    </section>
  );
}
