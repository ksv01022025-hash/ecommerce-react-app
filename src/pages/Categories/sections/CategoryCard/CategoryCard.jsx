import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ category }) {
  return (
    <Link
      className={`${styles.tile} ${styles[category.slug]}`}
      to={`/shop?category=${encodeURIComponent(category.name)}`}
    >
      <img src={category.image} alt={category.name} />
      <div>
        <h2>{category.name}</h2>
        <p>{category.count} Items</p>
        <i>→</i>
      </div>
    </Link>
  );
}

export default CategoryCard;
