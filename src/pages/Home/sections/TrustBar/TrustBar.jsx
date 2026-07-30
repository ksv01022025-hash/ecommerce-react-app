import styles from "./TrustBar.module.css";

const trustItems = [
  ["♢", "Quality You Can Trust", "Premium products from", "top brands worldwide."],
  ["♙", "Customer First", "24/7 support. We're here", "to help you anytime."],
  ["▣", "Secure Shopping", "Your data is safe with us.", "Encrypted and protected."],
  ["⟳", "Easy Returns", "Not happy? Return it within", "7 days. No questions asked."],
];

function TrustBar() {
  return (
    <footer className={`${styles.container} ${styles.trustBar}`}>
      {trustItems.map(([icon, title, firstLine, secondLine]) => (
        <div key={title}>
          <span>{icon}</span>
          <p>
            <b>{title}</b>
            <small>{firstLine}<br />{secondLine}</small>
          </p>
        </div>
      ))}
    </footer>
  );
}

export default TrustBar;
