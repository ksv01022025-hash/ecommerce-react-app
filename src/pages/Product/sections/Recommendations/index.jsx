import { Link } from 'react-router-dom'
import styles from './Recommendations.module.css'

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

function Recommendations({ products }) {
  return <><h2 className={styles.also}>You May Also Like</h2><section className={styles.recommend}>{products.map((product) => <article key={product._id}><Link to={`/product/${product._id}`}><img src={product.image || product.images?.[0]} alt={product.name} /><b>{product.name}</b></Link><span>★★★★★</span><strong>{formatPrice(product.price)}</strong></article>)}</section></>
}

export default Recommendations
