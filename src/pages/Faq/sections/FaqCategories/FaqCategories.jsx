import styles from './FaqCategories.module.css'
import { categories } from '../../data/faqData'
export default function FaqCategories(){return <section className={styles.categories}>{categories.map(([icon,title,count])=><article key={title}><b>{icon}</b><strong>{title}</strong><span>{count}</span></article>)}</section>}
