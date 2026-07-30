import styles from './Highlights.module.css'
import { highlights } from '../../data/termsData'
export default function Highlights(){return <section className={styles.highlights}>{highlights.map(([icon,title,line1,line2])=><article key={title}><b>{icon}</b><h2>{title}</h2><p>{line1}<br/>{line2}</p></article>)}</section>}
