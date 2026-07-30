import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../../redux/api/productsApi";
import styles from "./NewArrivals.module.css";
import WishlistButton from "../../../../components/WishlistButton";

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(value);

function NewArrivals() {
  const { data, error, isLoading, refetch } = useGetProductsQuery({ page: 1, limit: 6, sort: "newest" });
  const products = data?.products ?? [];

  return (
    <section className={`${styles.container} ${styles.products}`} id="new">
      <div className={styles.sectionHeading}>
        <h2>New Arrivals</h2>
        <Link to="/new-arrivals">View All <span>→</span></Link>
      </div>

      {isLoading && <p className={styles.status}>Loading new arrivals…</p>}
      {error && (
        <div className={styles.status} role="alert">
          <p>{error.data?.message || "Unable to load new arrivals."}</p>
          <button onClick={refetch} type="button">Try Again</button>
        </div>
      )}
      {!isLoading && !error && products.length === 0 && <p className={styles.status}>No new arrivals were found.</p>}
      {!error && products.length > 0 && (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <article className={styles.product} key={product._id}>
              <div className={styles.productPhoto}>
                <Link to={`/product/${product._id}`}><img src={product.image || product.images?.[0]} alt={product.alt || product.name} /></Link>
                <WishlistButton product={product} />
              </div>
              <h3>{product.name}</h3>
              <p className={styles.price}>
                {formatPrice(product.price)}
                {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
              </p>
              <p className={styles.rating}>★★★★★ <small>({product.reviewCount ?? product.reviews?.length ?? 0})</small></p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default NewArrivals;
