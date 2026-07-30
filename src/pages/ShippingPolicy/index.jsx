import styles from "./ShippingPolicy.module.css";
import ShippingHero from "./sections/ShippingHero/ShippingHero";
import Highlights from "./sections/Highlights/Highlights";
import ShippingDetails from "./sections/ShippingDetails/ShippingDetails";
import Perks from "./sections/Perks/Perks";

export default function ShippingPolicy() {
  return <main className={styles.page}><ShippingHero /><Highlights /><ShippingDetails /><Perks /></main>;
}
