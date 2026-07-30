function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <p>Explore your style</p>
        <h1>Shop by Category</h1>
        <span>Find everything you love in one place.</span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=87"
        alt="Neutral fashion collection"
      />
    </section>
  );
}

export default Hero;
import styles from "./Hero.module.css";
