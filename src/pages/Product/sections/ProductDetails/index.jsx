import styles from './ProductDetails.module.css'

function ProductDetails({ product }) {
  return <article><div className={styles.tabs}>Description · Product Details · Reviews ({product.reviewCount}) · Shipping & Returns</div><p>{product.longDescription}</p><ul>{product.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>
}

export default ProductDetails
