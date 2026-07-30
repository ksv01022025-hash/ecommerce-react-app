function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <i>✉</i>
      <div>
        <h2>Join Our Newsletter</h2>
        <p>Get updates on new arrivals, exclusive offers<br />and more straight to your inbox.</p>
      </div>
      <input type="email" aria-label="Email address" placeholder="Enter your email address" />
      <button type="button">Subscribe</button>
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=280&q=83"
        alt="Shopper"
      />
    </section>
  );
}

export default Newsletter;
import styles from "./Newsletter.module.css";
