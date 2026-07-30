import { Link } from "react-router-dom";
import { useGetCurrentDealCampaignQuery } from "../../../../redux/api/dealsApi";
import styles from "./DealBanner.module.css";

function DealBanner() {
  const { data } = useGetCurrentDealCampaignQuery();
  const campaign = data?.campaign;

  return (
    <section className={`${styles.container} ${styles.deal}`} id="deals">
      <div className={styles.dealCopy}>
        <p className={styles.eyebrow}>Limited time offer</p>
        <h2>Up to {campaign?.maximumDiscount ?? 50}% Off</h2>
        <p>{campaign?.subtitle || "On selected items. Shop now and save big!"}</p>
        <Link className={`${styles.button} ${styles.light}`} to="/deals">Shop Deals</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=88"
        alt="Woman carrying shopping bags"
      />
      <div className={styles.offer}>
        <small>SPECIAL</small>
        <b>{campaign?.maximumDiscount ?? 50}%</b>
        <small>OFF</small>
      </div>
    </section>
  );
}

export default DealBanner;
