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
  const image = product.image || product.images?.[0] || "https://placehold.co/600x700?text=Shopora";
  const reviewCount = product.reviewCount ?? product.reviews?.length ?? 0;
  const productPath = `/product/${encodeURIComponent(product._id)}`;

  return (
    <article className={styles.product}>
      <div className={styles.photo}>
        {product.discount && <mark>{product.discount}</mark>}
        <WishlistButton product={product} />
        <Link
          aria-label={`View ${product.name}`}
          className={styles.productLink}
          to={productPath}
        >
          <img src={image} alt={product.alt || product.name} />
        </Link>
      </div>
      <Link className={styles.productTitle} to={productPath}>
        <h2>{product.name}</h2>
      </Link>
      <p className={styles.stars}>★★★★★ <small>({reviewCount})</small></p>
      <p className={styles.price}>
        {formatPrice(product.price)}
        {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
      </p>
      <CartButton className={styles.addToCart} product={product} />
    </article>
  );
}

export default ProductCard;
