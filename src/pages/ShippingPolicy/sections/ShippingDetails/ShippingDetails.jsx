import { Link } from "react-router-dom";
import { shippingInformation, thingsToKnow } from "../../data/shippingData";
import styles from "./ShippingDetails.module.css";

export default function ShippingDetails() {
  return <section className={styles.grid}><section className={styles.shipping}><h2>Shipping Information</h2><i className={styles.underline} />{shippingInformation.map(([icon, title, copy]) => <article key={title}><b>{icon}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</section><aside className={styles.know}><h2>Things to Know</h2><i className={styles.underline} />{thingsToKnow.map(([title, copy]) => <article key={title}><b>✓</b><div><h3>{title}</h3><p>{copy}</p>{title === "Changed Your Mind?" && <Link to="/help/returns-exchanges">Read the returns policy →</Link>}{title === "Need Help?" && <Link to="/help/contact">Contact support →</Link>}</div></article>)}</aside></section>;
}
