import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../../redux/api/productsApi";
import CatalogTools from "../CatalogTools/CatalogTools";
import CollectionBanner from "../CollectionBanner/CollectionBanner";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Catalog.module.css";

function Catalog() {
  const [pagination, setPagination] = useState({ filterKey: "", page: 1 });
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const keyword = searchParams.get("keyword") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const color = searchParams.get("color") || undefined;
  const size = searchParams.get("size") || undefined;
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;
  const rating = searchParams.get("rating") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const filterKey = searchParams.toString();
  const page = pagination.filterKey === filterKey ? pagination.page : 1;
  const limit = 24;
  const { data, error, isLoading, isFetching, refetch } = useGetProductsQuery({
    page,
    limit,
    category,
    keyword,
    brand,
    color,
    size,
    minPrice,
    maxPrice,
    rating,
    sort,
  });

  const products = data?.products ?? [];
  const productCount = data?.count ?? 0;
  const pageCount = Math.max(Math.ceil(productCount / limit), 1);

  return (
    <div>
      <CollectionBanner />
      <CatalogTools
        count={productCount}
        isFetching={isFetching}
        limit={limit}
        page={page}
      />

      {isLoading && <p className={styles.status}>Loading products…</p>}

      {error && (
        <div className={styles.status} role="alert">
          <p>{error.data?.message || "Unable to load products from the server."}</p>
          <button onClick={refetch} type="button">Try Again</button>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p className={styles.status}>No products were found.</p>
      )}

      {!error && products.length > 0 && (
        <div className={styles.productGrid} aria-busy={isFetching}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={(nextPage) => setPagination({ filterKey, page: nextPage })}
          pageCount={pageCount}
        />
      )}
    </div>
  );
}

export default Catalog;
