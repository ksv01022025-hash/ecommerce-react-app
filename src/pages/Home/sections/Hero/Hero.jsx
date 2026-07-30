import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className={styles.hero} id="shop">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>New season collection</p>
        <h1>
          Elevate Your
          <br />
          Everyday Style
        </h1>
        <p className={styles.heroText}>
          Discover premium quality products
          <br />
          curated for your lifestyle.
        </p>
        <div className={styles.heroButtons}>
          <Link className={`${styles.button} ${styles.dark}`} to="/#new">
            Shop Now
          </Link>
          <Link className={`${styles.button} ${styles.outline}`} to="/#categories">
            Explore Collections
          </Link>
        </div>
        <div className={styles.heroBenefits}>
          <div>
            <strong>▣</strong>
            <p><b>Free Shipping</b><small>On orders over ₹999</small></p>
          </div>
          <div>
            <strong>⟳</strong>
            <p><b>Easy Returns</b><small>7-day return policy</small></p>
          </div>
          <div>
            <strong>▱</strong>
            <p><b>Secure Payment</b><small>100% secure checkout</small></p>
          </div>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.heroGlow}></div>
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1050&q=90"
          alt="Stylish couple in neutral fashion"
        />
      </div>
    </section>
  );
}

export default Hero;
