import styles from "./Wishlist.module.css";
import Benefits from "./sections/Benefits/Benefits";
import WishlistGrid from "./sections/WishlistGrid/WishlistGrid";
import WishlistHeader from "./sections/WishlistHeader/WishlistHeader";


export default function index() {
  return (
     <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › Wishlist</div>
        <WishlistHeader />
        <WishlistGrid />
        <Benefits />
      </main>
    </>
  )
}
