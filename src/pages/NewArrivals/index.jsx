import styles from "./NewArrivals.module.css";
import Benefits from "./sections/Benefits/Benefits";
import Catalog from "./sections/Catalog/Catalog";
import Hero from "./sections/Hero/Hero";
import Newsletter from "./sections/Newsletter/Newsletter";
import Perks from "./sections/Perks/Perks";


export default function NewArrivals() {
  return (
     <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › New Arrivals</div>
        <Hero />
        <Perks />
        <Catalog />
        <Benefits />
        <Newsletter />
      </main>
    </>
  )
}
