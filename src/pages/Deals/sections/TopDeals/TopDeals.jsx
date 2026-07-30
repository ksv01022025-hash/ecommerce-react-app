import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetDealsQuery } from "../../../../redux/api/dealsApi";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./TopDeals.module.css";

const dealTypes = [
  ["featured", "Featured Deals"],
  ["top-rated", "Top Rated"],
  ["best-sellers", "Best Sellers"],
  ["new", "New Deals"],
];

function TopDeals() {
  const [type, setType] = useState("featured");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const { data, error, isLoading, isFetching, refetch } = useGetDealsQuery({ type, category, limit: 12 });
  const products = data?.products ?? [];

  return (
    <section className={styles.top}>
      <div className={styles.sectionTitle}>
        <h2>Top Deals <span>✦</span></h2>
        <div className={styles.tabs}>
          {dealTypes.map(([value, label]) => (
            <button
              className={value === type ? styles.chosen : undefined}
              key={value}
              onClick={() => setType(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <Link to="/shop">View All Deals →</Link>
      </div>

      {isLoading && <p className={styles.status}>Loading deals…</p>}
      {error && (
        <div className={styles.status} role="alert">
          <p>{error.data?.message || "Unable to load deals from the server."}</p>
          <button onClick={refetch} type="button">Try Again</button>
        </div>
      )}
      {!isLoading && !error && products.length === 0 && <p className={styles.status}>No deals were found.</p>}
      {!error && products.length > 0 && (
        <div className={styles.products} aria-busy={isFetching}>
          {products.map((product) => <ProductCard product={product} key={product._id} />)}
        </div>
      )}
    </section>
  );
}

export default TopDeals;
