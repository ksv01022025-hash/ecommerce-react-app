import styles from "./CatalogTools.module.css";
import { useSearchParams } from "react-router-dom";

function CatalogTools({ count, isFetching, limit, page }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "newest";
  const changeSort = (event) => { const next = new URLSearchParams(searchParams); if (event.target.value === "newest") next.delete("sort"); else next.set("sort", event.target.value); setSearchParams(next); };
  const first = count === 0 ? 0 : (page - 1) * limit + 1;
  const last = Math.min(page * limit, count);

  return (
    <div className={styles.catalogTools}>
      <span>
        Showing {first}–{last} of {count} Products
        {isFetching && " (updating…)"}
      </span>
      <div>
        <b>Sort By:</b>
        <select aria-label="Sort products" onChange={changeSort} value={sort}><option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Top Rated</option></select>
        <button className={styles.grid} type="button" aria-label="Grid view">▦</button>
        <button type="button" aria-label="List view">☷</button>
      </div>
    </div>
  );
}

export default CatalogTools;
