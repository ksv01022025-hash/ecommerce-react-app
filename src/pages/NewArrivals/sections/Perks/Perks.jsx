const perks = [
  ["✧", "Latest Styles", "Handpicked just for you"],
  ["▣", "New Drops Daily", "Fresh arrivals every day"],
  ["♢", "Premium Quality", "Top quality products only"],
  ["◇", "Exclusive Designs", "Unique & trendsetting"],
];

function Perks() {
  return (
    <section className={styles.perks}>
      {perks.map(([icon, title, description]) => (
        <div key={title}>
          <i>{icon}</i>
          <p><b>{title}</b><small>{description}</small></p>
        </div>
      ))}
    </section>
  );
}

export default Perks;
import styles from "./Perks.module.css";
