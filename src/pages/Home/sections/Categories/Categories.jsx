import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../redux/api/productsApi";
import styles from "./Categories.module.css";

function Categories() {
  const { data, error, isLoading, refetch } = useGetCategoriesQuery();
  const categories = data?.categories ?? [];

  return (
    <section className={`${styles.container} ${styles.categories}`} id="categories">
      <div className={`${styles.sectionHeading} ${styles.centered}`}>
        <h2>Shop By Category</h2>
        <Link to="/categories">View All <span>→</span></Link>
      </div>

      {isLoading && <p className={styles.status}>Loading categories…</p>}
      {error && (
        <div className={styles.status} role="alert">
          <p>{error.data?.message || "Unable to load categories."}</p>
          <button onClick={refetch} type="button">Try Again</button>
        </div>
      )}
      {!isLoading && !error && categories.length === 0 && <p className={styles.status}>No categories were found.</p>}
      {!error && categories.length > 0 && (
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link to={`/shop?category=${encodeURIComponent(category.name)}`} key={category.slug}>
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Categories;
