import styles from "./Perks.module.css";

const perks = [
  ["♙", "100% Authentic", "Genuine products from", "trusted brands"],
  ["◇", "Best Prices", "Unbeatable prices on", "top brands"],
  ["♧", "Fast Delivery", "Quick delivery at your", "doorstep"],
  ["□", "Easy Returns", "Hassle-free returns", "within 7 days"],
];

function Perks() {
  return (
    <section className={styles.perks}>
      {perks.map(([icon, title, firstLine, secondLine]) => (
        <div key={title}>
          <i>{icon}</i>
          <p>
            <b>{title}</b>
            <small>{firstLine}<br />{secondLine}</small>
          </p>
        </div>
      ))}
    </section>
  );
}

export default Perks;
