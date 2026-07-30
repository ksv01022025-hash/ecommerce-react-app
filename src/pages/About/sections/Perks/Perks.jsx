import styles from './Perks.module.css'
import { perks } from '../../data/aboutData'
export default function Perks(){return <section className={styles.perks}>{perks.map(([icon,title,text])=><div key={title}><b>{icon}</b><p><strong>{title}</strong><span>{text}</span></p></div>)}</section>}
