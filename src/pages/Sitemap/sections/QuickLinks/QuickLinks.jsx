import styles from './QuickLinks.module.css'
import { quickLinks } from '../../data/sitemapData'
export default function QuickLinks(){return <section className={styles.quick}>{quickLinks.map(({href,icon,label})=><a href={href} key={href}>{icon}<span>{label}</span></a>)}</section>}
