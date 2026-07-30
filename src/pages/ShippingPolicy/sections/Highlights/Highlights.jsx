import { highlights } from "../../data/shippingData";
import styles from "./Highlights.module.css";
export default function Highlights() { return <section className={styles.highlights}>{highlights.map(([icon, title, first, second]) => <article key={title}><b>{icon}</b><h2>{title}</h2><i /><p>{first}<br />{second}</p></article>)}</section>; }
