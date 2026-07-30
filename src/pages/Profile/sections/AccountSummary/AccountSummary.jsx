import styles from "./AccountSummary.module.css";
import { Link } from "react-router-dom";

function AccountSummary({ accountBalance, addressCount, orderCount, paymentMethodCount, rewardPoints, wishlistCount }) {
  return (
    <section className={styles.card}>
      <header><h2>Account Summary</h2></header>
      <ul>
        <li>▣ Total Orders <b>{orderCount}</b></li>
        <li>♡ Wishlist Items <b>{wishlistCount}</b></li>
        <li>♢ Rewards Points <b>{rewardPoints}</b></li>
        <li>⌖ Saved Addresses <b>{addressCount}</b></li>
        <li>▤ Payment Methods <b>{paymentMethodCount}</b></li>
      </ul>
      <Link className={styles.balance} to="/profile/balance">▣ Available Balance <b>₹{Number(accountBalance).toLocaleString("en-IN")}</b></Link>
    </section>
  );
}

export default AccountSummary;
