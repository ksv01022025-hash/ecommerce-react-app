import { products } from "../../data/productData";
import styles from "./RecentlyViewed.module.css";

const recentNames = [
  "Minimal White Sneakers",
  "Chrono Black Watch",
  "Aviator Sunglasses",
  "Premium Leather Backpack",
  "Classic Oxford Shirt",
  "Floral Maxi Dress",
];

function RecentlyViewed() {
  const recentProducts = recentNames.map((name) => products.find((product) => product.name === name));

  return (
    <section className={styles.recent}>
      <div className={styles.newsletter}>
        <span>✉</span>
        <p><b>Join Our Newsletter</b><small>Get updates on new arrivals, offers and more.</small></p>
      </div>
      <div className={styles.recentProducts}>
        <b>Recently Viewed</b>
        <div>
          {recentProducts.map((product) => (
            <img
              src={`https://images.unsplash.com/${product.photo}?auto=format&fit=crop&w=150&q=75`}
              alt={product.name}
              key={product.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentlyViewed;
