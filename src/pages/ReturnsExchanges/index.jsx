import styles from "./ReturnsExchanges.module.css";
import ReturnsHero from "./sections/ReturnsHero/ReturnsHero";
import Highlights from "./sections/Highlights/Highlights";
import ReturnsPolicy from "./sections/ReturnsPolicy/ReturnsPolicy";
import ReturnProcess from "./sections/ReturnProcess/ReturnProcess";
import Perks from "./sections/Perks/Perks";

export default function ReturnsExchanges() {
  return (
    <main className={styles.page}>
      <ReturnsHero />
      <Highlights />
      <ReturnsPolicy />
      <ReturnProcess />
      <Perks />
    </main>
  );
}
