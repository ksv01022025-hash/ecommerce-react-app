import WishlistCard from "../WishlistCard/WishlistCard";
import { useSelector } from "react-redux";
import styles from "./WishlistGrid.module.css";

function WishlistGrid() {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return <p role="status">Your wishlist is empty. Select a heart on any product to save it here.</p>;
  }

  return (
    <section className={styles.products}>
      {wishlistItems.map((item) => <WishlistCard item={item} key={item.name} />)}
    </section>
  );
}

export default WishlistGrid;
