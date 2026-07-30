import { useDispatch, useSelector } from "react-redux";
import { clearWishlist } from "../../../../redux/features/wishlistSlice";
import { setCartItem } from "../../../../redux/features/cartSlice";
import { useClearServerWishlistMutation } from "../../../../redux/api/wishlistApi";
import styles from "./WishlistHeader.module.css";

function WishlistHeader() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [clearServerWishlist] = useClearServerWishlistMutation();

  const moveAllToCart = async () => {
    wishlistItems.forEach((item) => dispatch(setCartItem({ product: item._id, name: item.name, image: item.image || item.images?.[0], price: item.price, quantity: 1 })));
    dispatch(clearWishlist());
    if (isAuthenticated) {
      try {
        await clearServerWishlist().unwrap();
      } catch {
        // Cart items remain safe even if clearing the remote wishlist fails.
      }
    }
  };
  return (
    <section className={styles.wishlistHead}>
      <div>
        <h1>My Wishlist <small>({wishlistItems.length} items)</small> <i>♡</i></h1>
        <p>Items you love. Don't miss out!</p>
      </div>
      <div>
        <button type="button">♧ Share Wishlist</button>
        <button className={styles.move} disabled={!wishlistItems.length} onClick={moveAllToCart} type="button">🛒 Move All to Cart</button>
      </div>
    </section>
  );
}

export default WishlistHeader;
