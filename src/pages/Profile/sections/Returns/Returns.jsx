import { useMemo, useState } from "react";
import { useCreateReturnMutation } from "../../../../redux/api/returnApi";
import styles from "./Returns.module.css";

const reasons = ["Damaged product", "Wrong item received", "Size or fit issue", "Product not as described", "Changed my mind"];

function Returns({ data, isLoading }) {
  const eligibleItems = useMemo(() => (data?.eligibleOrders || []).flatMap((order) => order.items.filter((item) => item.eligible).map((item) => ({ ...item, orderId: order._id, orderNumber: order.orderNumber }))), [data]);
  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [resolution, setResolution] = useState("refund");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [createReturn, requestState] = useCreateReturnMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const item = eligibleItems.find((entry) => `${entry.orderId}|${entry.name}` === selected);
    if (!item) return setMessage("Please select an eligible item.");
    try {
      const result = await createReturn({ orderId: item.orderId, itemName: item.name, reason, resolution, details }).unwrap();
      setMessage(result.message);
      setSelected("");
      setDetails("");
    } catch (error) {
      setMessage(error.data?.message || "Unable to submit the return request.");
    }
  };

  if (isLoading) return <section className={styles.card}><p>Loading returns…</p></section>;

  return (
    <div className={styles.returns}>
      <section className={styles.policy}><i>↶</i><div><h2>Easy 7-Day Returns</h2><p>Request a return within seven days after delivery. Refunds are processed after the returned item passes inspection.</p></div></section>

      <section className={styles.card}>
        <h2>Start a Return</h2>
        {eligibleItems.length === 0 ? <p className={styles.empty}>You currently have no items eligible for return.</p> : (
          <form onSubmit={handleSubmit}>
            <label>Choose an item<select onChange={(event) => setSelected(event.target.value)} required value={selected}><option value="">Select an eligible item</option>{eligibleItems.map((item) => <option key={`${item.orderId}-${item.name}`} value={`${item.orderId}|${item.name}`}>Order #{item.orderNumber} — {item.name}</option>)}</select></label>
            <div className={styles.row}><label>Reason<select onChange={(event) => setReason(event.target.value)} value={reason}>{reasons.map((entry) => <option key={entry}>{entry}</option>)}</select></label><label>Preferred resolution<select onChange={(event) => setResolution(event.target.value)} value={resolution}><option value="refund">Refund</option><option value="replacement">Replacement</option></select></label></div>
            <label>Additional details (optional)<textarea maxLength="500" onChange={(event) => setDetails(event.target.value)} placeholder="Tell us more about the issue" value={details} /></label>
            <button disabled={requestState.isLoading} type="submit">{requestState.isLoading ? "Submitting…" : "Submit Return Request"}</button>
          </form>
        )}
        {message && <p className={requestState.isError ? styles.error : styles.success} role="status">{message}</p>}
      </section>

      <section className={styles.card}>
        <h2>Return & Refund History</h2>
        {!data?.requests?.length && <p className={styles.empty}>No return requests yet.</p>}
        <div className={styles.history}>{data?.requests?.map((entry) => <article key={entry._id}><div><b>{entry.itemName}</b><small>{entry.reason} · {entry.resolution === "refund" ? "Refund" : "Replacement"}</small><small>Requested {new Date(entry.createdAt).toLocaleDateString("en-IN")}</small></div><span data-status={entry.status}>{entry.status}</span></article>)}</div>
      </section>
    </div>
  );
}

export default Returns;
