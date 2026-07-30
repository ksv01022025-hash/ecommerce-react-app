import { Link, useLocation } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const location = useLocation();
  return (
    <main className={styles.page}>
      <section>
        <span>404</span>
        <h1>Page not found</h1>
        <p>We couldn’t find <code>{location.pathname}</code>. The page may have moved or the address may be incorrect.</p>
        <div><Link className={styles.primary} to="/">Go to Home</Link><Link to="/shop">Continue Shopping</Link></div>
      </section>
    </main>
  );
}
