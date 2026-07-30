import styles from "./Brands.module.css";
import Hero from "./sections/Hero/Hero";
import PopularBrands from "./sections/PopularBrands/PopularBrands";
import AllBrands from "./sections/AllBrands/AllBrands";
import Perks from "./sections/Perks/Perks";
import Newsletter from "./sections/Newsletter/Newsletter";

export default function Brands() {
  return (
     <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › Brands</div>
        <Hero />
        <PopularBrands />
        <AllBrands />
        <Perks />
        <Newsletter />
      </main>
    </>
  )
}
