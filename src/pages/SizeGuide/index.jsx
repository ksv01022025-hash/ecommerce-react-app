import styles from './SizeGuide.module.css'
import SizeHero from './sections/SizeHero/SizeHero'
import GuideSidebar from './sections/GuideSidebar/GuideSidebar'
import SizeChart from './sections/SizeChart/SizeChart'
import MeasuringGuide from './sections/MeasuringGuide/MeasuringGuide'
import HelpfulTips from './sections/HelpfulTips/HelpfulTips'
import Perks from './sections/Perks/Perks'
export default function SizeGuide(){return <main className={styles.wrap}><SizeHero/><section className={styles.guide}><GuideSidebar/><SizeChart/></section><section className={styles.measureGrid}><MeasuringGuide/><HelpfulTips/></section><Perks/></main>}
