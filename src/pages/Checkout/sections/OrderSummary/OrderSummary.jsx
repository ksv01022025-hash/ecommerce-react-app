import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCartItem, setCartItem } from "../../../../redux/features/cartSlice";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./OrderSummary.module.css";

const parsePrice = (value) => typeof value === "number"
  ? value
  : Number(String(value).replace(/[^0-9.]/g, ""));

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(value);

function OrderSummary({ deliveryMethod }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartItems);
  const [isEditing, setIsEditing] = useState(false);

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) return;
    dispatch(setCartItem({ ...item, quantity }));
  };

  const removeItem = (item) => {
    dispatch(removeCartItem(item.product));
  };

  const subtotal = items.reduce((total, item) => total + parsePrice(item.price) * (item.quantity || 1), 0);
  const discount = Math.round(subtotal * 0.1);
  const deliveryFee = deliveryMethod === "express" ? 149 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <aside className={styles.summary}>
      <div className={styles.summaryHead}>
        <h2>🛒 Order Summary <small>({items.length} Items)</small></h2>
        {items.length > 0 && (
          <button type="button" aria-pressed={isEditing} onClick={() => setIsEditing((editing) => !editing)}>
            {isEditing ? "Done" : "Edit Cart"}
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className={styles.empty} role="status">
          <p>Your cart is empty.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      ) : (
        <>
      <div className={styles.items}>
        {items.map((item) => (
          <OrderItem
            editing={isEditing}
            item={item}
            key={item.product}
            onQuantityChange={(quantity) => changeQuantity(item, quantity)}
            onRemove={() => removeItem(item)}
          />
        ))}
      </div>
      <div className={styles.totals}>
        <p>Subtotal <b>{formatPrice(subtotal)}</b></p>
        <p className={styles.discount}>Discount (WELCOME10) <b>− {formatPrice(discount)}</b></p>
        <p>Shipping <b className={deliveryFee === 0 ? styles.free : undefined}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</b></p>
        <hr />
        <h2>Total <b>{formatPrice(total)}</b></h2>
      </div>
      <div className={styles.secure}>
        <b>♢ Secure Checkout</b>
        <small>Your payment information is 100% secure and encrypted.</small>
      </div>
      <p className={styles.accept}>We Accept</p>
      <div className={styles.cards}><b>VISA</b><b>●●</b><b>RuPay</b><b>UPI</b><b>PayPal</b></div>
        </>
      )}
    </aside>
  );
}

export default OrderSummary;
