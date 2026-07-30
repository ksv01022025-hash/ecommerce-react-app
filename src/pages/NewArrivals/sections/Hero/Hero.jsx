import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <p>Just landed</p>
        <h1>New Arrivals</h1>
        <span>Be the first to explore our latest<br />collection of premium products.</span>
        <Link to="/new-arrivals#catalog">Shop Now</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=86"
        alt="New fashion collection"
      />
      <b>✦<small>NEW<br />COLLECTION<br />2024</small></b>
    </section>
  );
}

export default Hero;
