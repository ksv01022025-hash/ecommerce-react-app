import styles from "./Benefits.module.css";

const benefits = [
  ["▣", "Free Shipping", "On orders over ₹999"],
  ["⟳", "Easy Returns", "7-day return policy"],
  ["♢", "Secure Payment", "100% secure checkout"],
  ["◇", "Best Prices", "Unbeatable deals every day"],
];

function Benefits() {
  return (
    <section className={styles.benefits}>
      {benefits.map(([icon, title, description]) => (
        <div key={title}>
          <i>{icon}</i>
          <p><b>{title}</b><small>{description}</small></p>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
