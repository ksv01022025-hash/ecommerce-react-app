import { Link } from "react-router-dom";
import styles from "./AccountBalance.module.css";

const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount || 0);

function AccountBalance({ data, isLoading }) {
  if (isLoading) return <section className={styles.card}><p>Loading account balance…</p></section>;
  const transactions = data?.transactions || [];
  return (
    <div className={styles.wallet}>
      <section className={styles.hero}><div><small>AVAILABLE BALANCE</small><h2>{formatMoney(data?.balance)}</h2><p>Your Shopora balance can contain reward credits and approved refunds.</p></div><i>₹</i></section>
      <section className={styles.card}><h2>Add to Your Balance</h2><p>Redeem Shopora reward points to add credit to your balance. Every 10 reward points adds ₹1.</p><Link to="/profile/rewards">Redeem Reward Points</Link></section>
      <section className={styles.card}><h2>Balance History</h2>{transactions.length === 0 && <p className={styles.empty}>You have no balance transactions yet.</p>}<div className={styles.history}>{transactions.map((transaction) => <article key={transaction._id}><i>{transaction.type === "credit" ? "+" : "−"}</i><p><b>{transaction.description}</b><small>{transaction.reference && `${transaction.reference} · `}{new Date(transaction.createdAt).toLocaleDateString("en-IN")}</small></p><strong className={transaction.type === "credit" ? styles.credit : styles.debit}>{transaction.type === "credit" ? "+" : "−"}{formatMoney(transaction.amount)}</strong></article>)}</div></section>
      <section className={styles.note}><b>About Shopora Balance</b><p>Balance credits are tied to your account and cannot be transferred to another user or withdrawn as cash.</p></section>
    </div>
  );
}

export default AccountBalance;
