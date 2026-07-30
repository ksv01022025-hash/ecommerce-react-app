import styles from './SitemapGrid.module.css'
import { sitemapGroups } from '../../data/sitemapData'
import SitemapCard from '../SitemapCard/SitemapCard'
export default function SitemapGrid(){return <section className={styles.grid}>{sitemapGroups.map(group=><SitemapCard key={group.title} {...group}/>)}</section>}
