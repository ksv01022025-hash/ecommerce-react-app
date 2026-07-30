import styles from "./BrandCard.module.css";

function BrandCard({ brand, compact = false }) {
  return (
    <div className={`${styles.brand} ${styles[brand.className]} ${compact ? styles.compact : ""}`}>
      {brand.lines.map((line, index) => (
        <span key={line}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
      <small>{brand.products} Products</small>
    </div>
  );
}

export default BrandCard;
