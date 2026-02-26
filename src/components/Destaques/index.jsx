import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { Divider1 } from "../Divider";
import productsData from "../../assets/data/data-products/dataproducts.json";
import vendorsData from "../../assets/data/data-vendors/datavendors.json";
import categoriesData from "../../assets/data/data-categories/datacategories.json";
import { Link } from "react-router-dom";
import { limitarCaracteres } from "../../assets/services/tools";
export function Destaques() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const products = productsData.products;
        const vendors = vendorsData.vendors;
        const categories = categoriesData.categories;
        const productCount = products.length;

        if (productCount === 0) {
            return;
        }

        const numToFeature = Math.min(16, productCount);
        const randomIndices = new Set();

        while (randomIndices.size < numToFeature) {
            const randomNumber = Math.floor(Math.random() * productCount);
            randomIndices.add(randomNumber);
        }


        const selectedProducts = Array.from(randomIndices).map(index => {
            const product = products[index];
            const vendor = vendors.find(v => v.id === product.vendor_id);
            const category = categories.find(c => c.id === product.category_id);

            return {
                ...product,
                vendorName: vendor ? vendor.name : 'vendedor-nao-encontrado',
                categoryName: category ? category.name : 'categoria-nao-encontrada',
            };
        });

        setFeaturedProducts(selectedProducts);
    }, []);
    const slides = featuredProducts.map(product => ({
        image: product.image,
        price: product.price,
        caption: product.title,
        link: `/${product.categoryName}/${product.category_id}/${product.vendorName}/${product.vendor_id}/${product.title}/${product.id}`
    }));

    return (
        <div className={styles.destaqueContainer}>
            <Divider1>
                <h2>Produtos Sorteados</h2>
            </Divider1>

            <div className={styles.destaqueContent} >

                {slides.map((slide, index) => (
                    <div className={styles.destaqueCard} key={index}>
                        <Link to={slide.link} >
                            <img src={slide.image} alt={slide.caption} />
                            <h2 >{limitarCaracteres(slide.caption)}</h2>
                            <Divider1>
                                <p>R$ {slide.price.toFixed(2).replace('.', ',')}</p>
                            </Divider1>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}