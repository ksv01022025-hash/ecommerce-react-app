import { useGetCategoriesQuery } from "../../../../redux/api/productsApi";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoryGrid.module.css";

function CategoryGrid() {
  const { data, error, isLoading, refetch } = useGetCategoriesQuery();
  const categories = data?.categories ?? [];

  if (isLoading) {
    return <p className={styles.status}>Loading categories…</p>;
  }

  if (error) {
    return (
      <div className={styles.status} role="alert">
        <p>{error.data?.message || "Unable to load categories from the server."}</p>
        <button onClick={refetch} type="button">Try Again</button>
      </div>
    );
  }

  if (categories.length === 0) {
    return <p className={styles.status}>No categories were found.</p>;
  }

  return (
    <section className={styles.categoryGrid}>
      {categories.map((category) => (
        <CategoryCard category={category} key={category.slug} />
      ))}
    </section>
  );
}

export default CategoryGrid;
