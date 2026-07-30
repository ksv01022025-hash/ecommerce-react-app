import styles from "./Deals.module.css";
import Benefits from "./sections/Benefits/Benefits";
import DealCategories from "./sections/DealCategories/DealCategories";
import DealHero from "./sections/DealHero/DealHero";
import TopDeals from "./sections/TopDeals/TopDeals";



export default function Deals() {
  return (
     <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › Deals</div>
        <DealHero />
        <DealCategories />
        <TopDeals />
        <Benefits />
      </main>
    </>
  )
}
