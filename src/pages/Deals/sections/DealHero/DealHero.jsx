import { useGetCurrentDealCampaignQuery } from "../../../../redux/api/dealsApi";
import Countdown from "../Countdown/Countdown";
import styles from "./DealHero.module.css";

function DealHero() {
  const { data } = useGetCurrentDealCampaignQuery();
  const campaign = data?.campaign;

  return (
    <section className={styles.dealHero}>
      <div className={styles.heroCopy}>
        <p>Limited time only</p>
        <h1>{campaign?.title || "Best Deals Of The Day"}</h1>
        <span>{campaign?.subtitle || "Grab unbeatable deals on top brands."}</span>
        {campaign?.endsAt && <Countdown endsAt={campaign.endsAt} />}
      </div>
      <div className={styles.sale}><small>UP TO</small><b>{campaign?.maximumDiscount ?? 70}%</b><small>OFF</small></div>
      <img
        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=550&q=88"
        alt="Leather bag"
      />
      <img
        className={styles.watch}
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=88"
        alt="Black watch"
      />
      <img
        className={styles.shoe}
        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=450&q=88"
        alt="White sneaker"
      />
    </section>
  );
}

export default DealHero;
