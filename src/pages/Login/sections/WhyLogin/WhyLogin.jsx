import styles from "./WhyLogin.module.css";

const reasons = [
  ["▣", "Faster Checkout", "Save your details and checkout", "in just a few clicks."],
  ["♡", "Wishlist", "Save your favorite items and", "shop them later."],
  ["◇", "Order Tracking", "Track your orders and get real-time", "updates."],
  ["◇", "Exclusive Offers", "Get access to member-only deals", "and discounts."],
];

function WhyLogin() {
  return (
    <div className={styles.why}>
      <div className={styles.whyCopy}>
        <h2>Why Login?</h2>
        {reasons.map(([icon, title, firstLine, secondLine]) => (
          <div key={title}>
            <i>{icon}</i>
            <p>
              <b>{title}</b>
              <small>{firstLine}<br />{secondLine}</small>
            </p>
          </div>
        ))}
      </div>
      <img
        className={styles.bagPhoto}
        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=520&q=87"
        alt="Leather bag"
      />
      <img
        className={styles.watchPhoto}
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=350&q=87"
        alt="Watch"
      />
      <img
        className={styles.glassesPhoto}
        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=350&q=87"
        alt="Sunglasses"
      />
    </div>
  );
}

export default WhyLogin;
