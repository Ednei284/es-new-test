import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { CartContext } from '../../contexts/CartContext'
import { useContext } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'
import { LogProductClick } from '../ClickLogger';
import { Divider1 } from '../Divider'
export function AddRemoveProduct({
    vendorName,
    productid,
    categoryName,
    vendorId,
    categoryId,
    title,
    price
}) {
    const { addToCart, reduceQuantity } = useContext(CartContext);
    const handleAdd = () => {
        addToCart({
            name_vendor: vendorName,
            id: productid,
            categoryName,
            vendorId,
            categoryId,
            title,
            price
        });

    }
    const handleRem = () => {
        reduceQuantity(productid);
    }
    return (
        <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', gap: '.5rem', height: '100%', padding: '.5rem' }} className={styles.buttonContainer}>
            <button
                style={{ textAlign: 'center', border: 'none', borderRadius: '.5rem', color: 'white', backgroundColor: 'var(--base-color)', padding: '.5rem', margin: ' .1rem' }}

                onClick={handleRem}
            >
                <FaMinus />
            </button>
            {categoryId ?
                <LogProductClick
                    productId={productid}
                    title={title}
                    vendorId={vendorId}
                    categoryId={categoryId}
                    price={price}
                    url='product'
                >
                    <Link
                        className='button'
                        style={{ padding: '1rem', margin: ' 1rem' }}
                        to={`/${categoryName}/${categoryId}/${vendorName}/${vendorId}/${title}/${productid}`}
                    >
                        Detalhes de {title}
                    </Link>
                </LogProductClick>

                : ''
            }
            <button style={{ textAlign: 'center', border: 'none', borderRadius: '.5rem', color: 'white', backgroundColor: 'var(--base-color)', padding: '.5rem', margin: ' .1rem' }}
                onClick={handleAdd}><FaPlus /></button>
        </div>
    )
}