import styles from "./Categories.module.css";

import CategoryGrid from "./sections/CategoryGrid/CategoryGrid";
import Hero from "./sections/Hero/Hero";
import TrustSection from "./sections/TrustSection/TrustSection";

export default function Categories() {
  return (
     <>
      <main className={styles.container}>
        <div className={styles.crumb}>Home <span>›</span> Categories</div>
        <Hero />
        <CategoryGrid />
        <TrustSection />
      </main>
    </>
  )
}
