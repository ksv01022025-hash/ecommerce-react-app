import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartItem } from "../../../../redux/features/cartSlice";
import { removeWishlistItem, toggleWishlistItem } from "../../../../redux/features/wishlistSlice";
import { useRemoveWishlistItemFromServerMutation } from "../../../../redux/api/wishlistApi";
import styles from "./WishlistCard.module.css";

const formatPrice = (value) => typeof value === "number"
  ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
  : value;

function WishlistCard({ item }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [removeFromServer, removeState] = useRemoveWishlistItemFromServerMutation();
  const image = item.image || item.images?.[0] || (item.photo
    ? `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=600&q=84`
    : "https://placehold.co/600x700?text=Shopora");
  const remove = async () => {
    dispatch(removeWishlistItem(item._id));
    if (!isAuthenticated) return;
    try {
      await removeFromServer(item._id).unwrap();
    } catch {
      dispatch(toggleWishlistItem(item));
    }
  };
  const moveToCart = () => {
    dispatch(setCartItem({ product: item._id, name: item.name, image, price: item.price, quantity: 1 }));
    remove();
  };

  return (
    <article className={styles.card}>
      <div className={styles.pic}>
        <i>♥</i>
        <Link to={`/product/${item._id}`}><img src={image} alt={item.alt || item.name} /></Link>
      </div>
      <h2><Link to={`/product/${item._id}`}>{item.name}</Link></h2>
      <p className={styles.stars}>★★★★★ <small>({item.reviewCount ?? item.reviews?.length ?? 0})</small></p>
      <p className={styles.price}>{formatPrice(item.price)} {item.originalPrice && <del>{formatPrice(item.originalPrice)}</del>} {item.discount && <b>{item.discount}</b>}</p>
      <div className={styles.buttons}>
        <button onClick={moveToCart} type="button">🛒 Move to Cart</button>
        <button disabled={removeState.isLoading} onClick={remove} type="button" aria-label={`Remove ${item.name} from wishlist`}>×</button>
      </div>
    </article>
  );
}

export default WishlistCard;
