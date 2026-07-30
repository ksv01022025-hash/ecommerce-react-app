import BrandCard from "../BrandCard/BrandCard";
import { brands } from "../../data/brandData";
import styles from "./PopularBrands.module.css";
import { Link } from "react-router-dom";

function PopularBrands() {
  return (
    <section>
      <div className={styles.heading}>
        <h2>Popular Brands</h2>
        <Link to="/brands#all-brands">View All Brands →</Link>
      </div>
      <div className={styles.popularGrid}>
        {brands.slice(0, 8).map((brand) => (
          <BrandCard brand={brand} key={brand.className} />
        ))}
      </div>
    </section>
  );
}

export default PopularBrands;
