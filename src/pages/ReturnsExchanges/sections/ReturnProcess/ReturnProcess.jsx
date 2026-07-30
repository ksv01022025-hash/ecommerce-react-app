import { returnSteps } from "../../data/returnsData";
import styles from "./ReturnProcess.module.css";

export default function ReturnProcess() {
  return <section className={styles.process}><h2>How Returns &amp; Exchanges Work</h2><i /><div>{returnSteps.map(([number, title, text], index) => <span className={styles.step} key={title}><article><b>{number}</b><h3>{title}</h3><p>{text}</p></article>{index < returnSteps.length - 1 && <strong aria-hidden="true">→</strong>}</span>)}</div></section>;
}
