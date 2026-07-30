import styles from './Contact.module.css'
import ContactHero from './sections/ContactHero/ContactHero'
import ContactStrip from './sections/ContactStrip/ContactStrip'
import ContactForm from './sections/ContactForm/ContactForm'
import ContactSidebar from './sections/ContactSidebar/ContactSidebar'
import FaqPreview from './sections/FaqPreview/FaqPreview'
import Location from './sections/Location/Location'
import Perks from './sections/Perks/Perks'
export default function Contact(){return <main className={styles.wrap}><ContactHero/><ContactStrip/><section className={styles.contactGrid}><ContactForm/><ContactSidebar/></section><section className={styles.bottomGrid}><FaqPreview/><Location/></section><Perks/></main>}
