import { useState } from "react";
import { useRedeemPointsMutation } from "../../../../redux/api/rewardApi";
import styles from "./Rewards.module.css";

function Rewards({ points, transactions }) {
  const [redeemAmount, setRedeemAmount] = useState(100);
  const [message, setMessage] = useState("");
  const [redeemPoints, requestState] = useRedeemPointsMutation();

  const handleRedeem = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await redeemPoints(Number(redeemAmount)).unwrap();
      setMessage(result.message);
    } catch (error) {
      setMessage(error.data?.message || "Unable to redeem points.");
    }
  };

  return (
    <div className={styles.rewards}>
      <section className={styles.hero}>
        <div><small>AVAILABLE REWARDS</small><h2>{points} <span>points</span></h2><p>Every 10 points are worth ₹1 in rewards.</p></div>
        <i>♢</i>
      </section>

      <section className={styles.card}>
        <h2>Redeem Points</h2>
        <p>Redeem a minimum of 100 points. Your redemption is recorded in your rewards history.</p>
        <form onSubmit={handleRedeem}>
          <label>Points to redeem<input min="100" onChange={(event) => setRedeemAmount(event.target.value)} step="10" type="number" value={redeemAmount} /></label>
          <button disabled={requestState.isLoading || points < 100} type="submit">{requestState.isLoading ? "Redeeming…" : "Redeem Points"}</button>
        </form>
        {message && <p className={requestState.isError ? styles.error : styles.success} role="status">{message}</p>}
      </section>

      <section className={styles.card}>
        <h2>How to Earn Points</h2>
        <div className={styles.earn}><p><i>🛍</i><b>Place an Order</b><small>Earn 1 point for every ₹100 spent</small></p><p><i>★</i><b>Review a Product</b><small>Earn 10 points for your first review</small></p><p><i>🎁</i><b>Invite a Friend</b><small>Earn 50 points when your friend joins</small></p></div>
      </section>

      <section className={styles.card}>
        <h2>Points History</h2>
        {transactions.length === 0 && <p className={styles.empty}>You have no rewards activity yet.</p>}
        <div className={styles.history}>{transactions.map((transaction) => <article key={transaction._id}><i>{transaction.type === "earned" ? "+" : "−"}</i><p><b>{transaction.description}</b><small>{new Date(transaction.createdAt).toLocaleDateString("en-IN")}</small></p><strong className={transaction.type === "earned" ? styles.earned : styles.redeemed}>{transaction.points > 0 ? "+" : ""}{transaction.points}</strong></article>)}</div>
      </section>
    </div>
  );
}

export default Rewards;
