import styles from "./Newsletter.module.css";

function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <i>✉</i>
      <div>
        <h2>Stay Updated with Top Brands</h2>
        <p>Subscribe to get updates on new brand launches,<br />exclusive offers & more.</p>
      </div>
      <input type="email" aria-label="Email address" placeholder="Enter your email address" />
      <button type="button">Subscribe</button>
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=250&q=83"
        alt="Shopper"
      />
    </section>
  );
}

export default Newsletter;
