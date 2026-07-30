import styles from "./OrderItem.module.css";

const formatPrice = (value) => typeof value === "number"
  ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
  : value;

const parsePrice = (value) => typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));

function OrderItem({ editing, item, onQuantityChange, onRemove }) {
  const image = item.image || item.images?.[0] || (item.photo
    ? `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=150&q=80`
    : "https://placehold.co/150x150?text=Shopora");
  const quantity = item.quantity || 1;

  return (
    <div className={styles.item}>
      <img src={image} alt={item.name} />
      <p>
        <b>{item.name}</b>
        <small>{item.detail && <>{item.detail}<br /></>}Qty: {quantity}</small>
        {editing && (
          <span className={styles.controls}>
            <button disabled={quantity <= 1} onClick={() => onQuantityChange(quantity - 1)} type="button" aria-label={`Decrease ${item.name} quantity`}>−</button>
            <strong>{quantity}</strong>
            <button onClick={() => onQuantityChange(quantity + 1)} type="button" aria-label={`Increase ${item.name} quantity`}>+</button>
            <button className={styles.remove} onClick={onRemove} type="button">Remove</button>
          </span>
        )}
      </p>
      <strong>{formatPrice(parsePrice(item.price) * quantity)}</strong>
    </div>
  );
}

export default OrderItem;
