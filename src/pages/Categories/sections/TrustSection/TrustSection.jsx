const trustItems = [
  ["♢", "Quality You Can Trust", "Premium products from", "top brands worldwide."],
  ["♙", "Customer First", "24/7 support. We're here", "to help you anytime."],
  ["▣", "Secure Shopping", "Your data is safe with us.", "Encrypted and protected."],
  ["⟳", "Easy Returns", "Not happy? Return it within", "7 days. No questions asked."],
];

function TrustSection() {
  return (
    <section className={styles.trust}>
      {trustItems.map(([icon, title, firstLine, secondLine]) => (
        <div key={title}>
          <i>{icon}</i>
          <p>
            <b>{title}</b>
            <small>{firstLine}<br />{secondLine}</small>
          </p>
        </div>
      ))}
    </section>
  );
}

export default TrustSection;
import styles from "./TrustSection.module.css";
