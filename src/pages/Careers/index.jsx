import styles from './Careers.module.css'
import CareersHero from './sections/CareersHero/CareersHero'
import Benefits from './sections/Benefits/Benefits'
import OpenPositions from './sections/OpenPositions/OpenPositions'
import Testimonials from './sections/Testimonials/Testimonials'
import CareersCta from './sections/CareersCta/CareersCta'
import Perks from './sections/Perks/Perks'
export default function Careers(){return <main className={styles.wrap}><CareersHero/><Benefits/><OpenPositions/><Testimonials/><CareersCta/><Perks/></main>}
