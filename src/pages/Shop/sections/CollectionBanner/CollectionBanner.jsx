import { Link } from "react-router-dom";
import styles from "./CollectionBanner.module.css";

function CollectionBanner() {
  return (
    <section className={styles.collection}>
      <div>
        <p>New season collection</p>
        <h1>Summer Collection</h1>
        <span>Discover the latest trends in men’s fashion.</span>
        <Link to="/new-arrivals">Shop Now</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=850&q=85"
        alt="Fashion collection"
      />
    </section>
  );
}

export default CollectionBanner;
