import styles from "./OrderItem.module.css";

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(value);

function OrderItem({ item }) {
  return (
    <div className={styles.item}>
      <img src={item.image || "https://placehold.co/130x100?text=Product"} alt={item.name} />
      <p><b>{item.name}</b><small>Qty: {item.quantity} · {formatPrice(item.price)}</small></p>
    </div>
  );
}

export default OrderItem;
