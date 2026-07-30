import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <p>Top brands. Trusted quality.</p>
        <h1>Shop Top Brands<br />You Love</h1>
        <span>
          Explore 100+ global brands across fashion,<br />footwear,
          accessories, beauty & more.
        </span>
        <Link to="/brands#all-brands">Shop All Brands</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=450&q=85"
        alt="Leather backpack"
      />
      <img
        className={styles.watch}
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=85"
        alt="Watch"
      />
      <img
        className={styles.shoe}
        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=85"
        alt="White shoe"
      />
      <img
        className={styles.glasses}
        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=85"
        alt="Sunglasses"
      />
    </section>
  );
}

export default Hero;
