import styles from "./CatalogFilters.module.css";

function CatalogFilters({ categories, category, isLoading, onCategoryChange, onSortChange, sort }) {
  return (
    <div className={styles.filters}>
      {categories.map((filter) => (
        <button
          className={filter === category ? styles.selected : undefined}
          disabled={isLoading}
          onClick={() => onCategoryChange(filter)}
          type="button"
          key={filter}
        >
          {filter}
        </button>
      ))}
      <label htmlFor="new-arrivals-sort">Sort By:</label>
      <select
        className={styles.sort}
        id="new-arrivals-sort"
        onChange={(event) => onSortChange(event.target.value)}
        value={sort}
      >
        <option value="newest">Newest First</option>
        <option value="rating">Top Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}

export default CatalogFilters;
