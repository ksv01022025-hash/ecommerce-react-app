import styles from './TermsConditions.module.css'
import TermsHero from './sections/TermsHero/TermsHero'
import Highlights from './sections/Highlights/Highlights'
import TermsLayout from './sections/TermsLayout/TermsLayout'
import Perks from './sections/Perks/Perks'
export default function TermsConditions(){return <main className={styles.wrap}><div className={styles.crumb}>Home <span>›</span> Terms & Conditions</div><TermsHero/><Highlights/><TermsLayout/><Perks/></main>}
