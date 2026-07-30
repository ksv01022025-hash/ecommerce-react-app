import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import WishlistButton from "../../../../components/WishlistButton";
import CartButton from "../../../../components/CartButton";

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(value);

function ProductCard({ product }) {
  const image = product.image || product.images?.[0] || "https://placehold.co/500x600?text=Shopora";

  return (
    <article className={styles.product}>
      <div className={styles.pic}>
        <mark>NEW</mark>
        <WishlistButton product={product} />
        <Link to={`/product/${product._id}`}><img src={image} alt={product.alt || product.name} /></Link>
      </div>
      <h3>{product.name}</h3>
      <p className={styles.stars}>★★★★★ <small>({product.reviewCount ?? product.reviews?.length ?? 0})</small></p>
      <p className={styles.price}>
        {formatPrice(product.price)}
        {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
      </p>
      <CartButton product={product} />
    </article>
  );
}

export default ProductCard;
