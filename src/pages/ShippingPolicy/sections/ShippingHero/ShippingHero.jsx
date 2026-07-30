import { Link } from "react-router-dom";
import styles from "./ShippingHero.module.css";

export default function ShippingHero() {
  return <><nav className={styles.crumb} aria-label="Breadcrumb"><Link to="/">Home</Link><span>›</span><span>Shipping Policy</span></nav><section className={styles.hero}><div><h1>Shipping Policy</h1><p>At Shopora, we strive to deliver your orders quickly and safely.<br />Please read our shipping policy below for detailed information.</p></div><div className={styles.truckArt} aria-hidden="true"><div className={styles.city} /><b className={`${styles.pin} ${styles.one}`}>●</b><b className={`${styles.pin} ${styles.two}`}>●</b><div className={styles.truck}><i /><em /><strong>▣</strong></div><div className={styles.boxes}>▣<br />▣</div></div></section></>;
}
