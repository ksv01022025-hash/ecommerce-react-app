import styles from './Sitemap.module.css'
import SitemapHero from './sections/SitemapHero/SitemapHero'
import QuickLinks from './sections/QuickLinks/QuickLinks'
import SitemapGrid from './sections/SitemapGrid/SitemapGrid'
import HelpBanner from './sections/HelpBanner/HelpBanner'
import Perks from './sections/Perks/Perks'
export default function Sitemap(){return <main className={styles.wrap}><div className={styles.crumb}>Home <span>›</span> Sitemap</div><SitemapHero/><QuickLinks/><SitemapGrid/><HelpBanner/><Perks/></main>}
