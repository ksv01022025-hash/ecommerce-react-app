import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProductInfo.module.css'
import CartButton from '../../../../components/CartButton'

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const discount = product.discount || (product.originalPrice > product.price
    ? `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`
    : '')
  const discountLabel = String(discount)
  return (
    <div className={styles.info}>
      <h1>{product.name}</h1>
      <p className={styles.stars}>★★★★★ <span>{product.ratings?.toFixed(1) ?? '0.0'} ({product.reviewCount ?? product.reviews?.length ?? 0} Reviews) | Sold {product.soldCount ?? 0}+</span></p>
      <p className={styles.price}>{formatPrice(product.price)} {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>} {discountLabel && <b>{discountLabel.includes('OFF') ? discountLabel : `${discountLabel} OFF`}</b>}</p>
      <small>Inclusive of all taxes</small>
      <p className={styles.description}>{product.description}</p>
      <ul>{product.specifications.map(([label, value]) => <li key={label}>{label}: {value}</li>)}</ul>
      <div className={styles.stock}>{product.stock > 0 ? '● In Stock' : 'Out of Stock'} {product.stock > 0 && <b>Only {product.stock} items left!</b>}</div>
      <p className={styles.quantity}>Quantity: <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><button type="button" aria-label={`Quantity ${quantity}`}>{quantity}</button><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}>＋</button></p>
      <CartButton className={styles.cart} disabled={product.stock === 0} product={product} quantity={quantity}>🛒 Add to Cart</CartButton>
      <CartButton
        className={styles.buy}
        disabled={product.stock === 0}
        onAdded={() => navigate('/checkout')}
        product={product}
        quantity={quantity}
      >
        Buy Now
      </CartButton>
      <div className={styles.mini}><span>♧ Free Shipping<small>On orders over ₹999</small></span><span>⟳ Easy Returns<small>7-day return policy</small></span><span>♦ Secure Payment<small>100% secure checkout</small></span></div>
    </div>
  )
}

export default ProductInfo
