import styles from './ShopStats.module.css'
import { stats } from '../../data/aboutData'
export default function ShopStats(){return <section className={styles.stats}><h2>Why Shop with Shopora?</h2><i/><div>{stats.map(([icon,value,label])=><article key={label}><b>{icon}</b><strong>{value}</strong><p>{label}</p></article>)}</div></section>}
