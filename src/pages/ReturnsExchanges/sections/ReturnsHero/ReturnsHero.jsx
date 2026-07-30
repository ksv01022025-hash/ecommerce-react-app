import { Link } from "react-router-dom";
import styles from "./ReturnsHero.module.css";

export default function ReturnsHero() {
  return (
    <>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>›</span><span>Returns &amp; Exchanges</span>
      </nav>
      <section className={styles.hero}>
        <div>
          <h1>Returns &amp; Exchanges</h1>
          <p>Your satisfaction is our priority. If you&apos;re not completely happy<br />with your purchase, we&apos;re here to help.</p>
        </div>
        <div className={styles.art} aria-hidden="true">
          <div className={styles.box}>Shopora.</div>
          <div className={styles.returnIcon}>↻</div>
          <div className={styles.bag}>♧</div>
          <div className={styles.plant}>♠</div>
        </div>
      </section>
    </>
  );
}
