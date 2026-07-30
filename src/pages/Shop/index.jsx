import Catalog from "./sections/Catalog/Catalog";
import RecentlyViewed from "./sections/RecentlyViewed/RecentlyViewed";
import ShopFilters from "./sections/ShopFilters/ShopFilters";
import styles from "./Shop.module.css";


export default function index() {
  return (
      <>
      <main className={styles.wrap}>
        <div className={styles.crumbs}>Home <span>›</span> Shop <span>›</span> Men</div>
        <div className={styles.layout}>
          <ShopFilters />
          <Catalog />
        </div>
        <RecentlyViewed />
      </main>
    </>
  )
}
