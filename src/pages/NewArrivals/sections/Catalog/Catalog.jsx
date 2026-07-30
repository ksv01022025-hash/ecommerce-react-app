import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "../../../../redux/api/productsApi";
import CatalogFilters from "../CatalogFilters/CatalogFilters";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Catalog.module.css";

function Catalog() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(8);
  const categoriesQuery = useGetCategoriesQuery();
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit,
    sort,
    category: category === "All" ? undefined : category,
  });

  const products = productsQuery.data?.products ?? [];
  const productCount = productsQuery.data?.count ?? 0;
  const categories = ["All", ...(categoriesQuery.data?.categories ?? []).map((item) => item.name)];

  const selectCategory = (value) => {
    setCategory(value);
    setLimit(8);
  };

  return (
    <section id="catalog">
      <CatalogFilters
        categories={categories}
        category={category}
        isLoading={categoriesQuery.isLoading}
        onCategoryChange={selectCategory}
        onSortChange={setSort}
        sort={sort}
      />
      <div className={styles.heading}>
        <h2>Just Dropped</h2>
        <span>{productCount} products</span>
      </div>

      {productsQuery.isLoading && <p className={styles.status}>Loading new arrivals…</p>}
      {productsQuery.error && (
        <div className={styles.status} role="alert">
          <p>{productsQuery.error.data?.message || "Unable to load new arrivals from the server."}</p>
          <button onClick={productsQuery.refetch} type="button">Try Again</button>
        </div>
      )}
      {!productsQuery.isLoading && !productsQuery.error && products.length === 0 && (
        <p className={styles.status}>No new arrivals were found.</p>
      )}
      {!productsQuery.error && products.length > 0 && (
        <div className={styles.products} aria-busy={productsQuery.isFetching}>
          {products.map((product) => <ProductCard product={product} key={product._id} />)}
        </div>
      )}

      {products.length < productCount && (
        <button className={styles.view} onClick={() => setLimit((current) => current + 8)} type="button">
          View More New Arrivals
        </button>
      )}
    </section>
  );
}

export default Catalog;
