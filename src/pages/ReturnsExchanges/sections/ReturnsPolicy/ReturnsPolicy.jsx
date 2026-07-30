import { Link } from "react-router-dom";
import { ineligibleItems, policies } from "../../data/returnsData";
import styles from "./ReturnsPolicy.module.css";

function PolicyItems({ items }) {
  return items.map(([icon, title, text]) => <article key={title}><b>{icon}</b><div><h3>{title}</h3><p>{text}</p></div></article>);
}

export default function ReturnsPolicy() {
  return (
    <section className={styles.grid}>
      <section className={styles.policy}>
        <h2>Our Returns &amp; Exchanges Policy</h2><i className={styles.underline} />
        <p className={styles.intro}>We want you to love what you ordered. If you&apos;re not satisfied, you can return or exchange eligible items within seven days of receiving your order.</p>
        <PolicyItems items={policies} />
      </section>
      <aside>
        <section className={styles.ineligible}><h2>Items Not Eligible for Returns</h2><i className={styles.underline} /><PolicyItems items={ineligibleItems} /></section>
        <section className={styles.help}>
          <h2>Need Help?</h2><p>Our support team can assist with return or exchange questions.</p>
          <a href="tel:+919876543210">☎ &nbsp; +91 98765 43210</a>
          <a href="mailto:support@shopora.com">✉ &nbsp; support@shopora.com</a>
          <span>◷ &nbsp; Mon – Sat: 9:00 AM – 8:00 PM</span>
          <Link to="/help/contact">Contact Support &nbsp; →</Link>
        </section>
      </aside>
    </section>
  );
}
