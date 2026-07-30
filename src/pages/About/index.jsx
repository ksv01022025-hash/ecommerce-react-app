import styles from './About.module.css'
import AboutHero from './sections/AboutHero/AboutHero'
import OurStory from './sections/OurStory/OurStory'
import ShopStats from './sections/ShopStats/ShopStats'
import Team from './sections/Team/Team'
import Perks from './sections/Perks/Perks'
export default function About(){return <main className={styles.wrap}><AboutHero/><OurStory/><ShopStats/><Team/><Perks/></main>}
