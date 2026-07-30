import styles from './Testimonials.module.css'
import { quotes } from '../../data/careersData'
export default function Testimonials(){return <section className={styles.testimonials}><h2>Hear from our team</h2><i/><div>{quotes.map(([quote,name,role])=><article key={name}><b>“</b><p>{quote}</p><strong>{name}</strong><small>{role}</small></article>)}</div></section>}
