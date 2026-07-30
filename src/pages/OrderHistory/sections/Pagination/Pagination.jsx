import styles from "./Pagination.module.css";

function Pagination({ currentPage, onPageChange, pageCount }) {
  return (
    <nav className={styles.pages} aria-label="Order pages">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} type="button" aria-label="Previous page">‹</button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
        <button
          aria-current={page === currentPage ? "page" : undefined}
          className={page === currentPage ? styles.current : undefined}
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <button disabled={currentPage === pageCount} onClick={() => onPageChange(currentPage + 1)} type="button" aria-label="Next page">›</button>
    </nav>
  );
}

export default Pagination;
