import styles from './PrivacyPolicy.module.css'
import PrivacyHero from './sections/PrivacyHero/PrivacyHero'
import Highlights from './sections/Highlights/Highlights'
import PolicyLayout from './sections/PolicyLayout/PolicyLayout'
import Perks from './sections/Perks/Perks'

export default function PrivacyPolicy(){return <main className={styles.wrap}><PrivacyHero/><Highlights/><PolicyLayout/><Perks/></main>}
