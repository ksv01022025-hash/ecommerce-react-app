import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyStripeCheckoutQuery } from "../../redux/api/orderApi";
import { clearCart } from "../../redux/features/cartSlice";
import styles from "./PaymentResult.module.css";

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const dispatch = useDispatch();
  const { data, error, isLoading } = useVerifyStripeCheckoutQuery(sessionId, { skip: !sessionId });
  useEffect(() => { if (data?.paid) dispatch(clearCart()); }, [data, dispatch]);
  return <main className={styles.page}><section><span className={styles.success}>✓</span><h1>{isLoading ? "Verifying payment…" : data?.paid ? "Payment successful" : "Payment verification failed"}</h1><p>{data?.paid ? `Your order ${data.order?.orderNumber || data.order?._id || ""} has been placed.` : error?.data?.message || "Please wait while Stripe confirms your payment."}</p>{data?.paid ? <Link to="/order-history">View your orders</Link> : <Link to="/checkout">Return to checkout</Link>}</section></main>;
}

export function PaymentCancelled() {
  return <main className={styles.page}><section><span className={styles.cancel}>×</span><h1>Payment cancelled</h1><p>Your cart was preserved and no payment was taken.</p><Link to="/checkout">Return to checkout</Link></section></main>;
}
