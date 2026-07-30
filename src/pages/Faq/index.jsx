import styles from './Faq.module.css'
import FaqHero from './sections/FaqHero/FaqHero'
import FaqCategories from './sections/FaqCategories/FaqCategories'
import QuestionList from './sections/QuestionList/QuestionList'
import HelpSidebar from './sections/HelpSidebar/HelpSidebar'
import Perks from './sections/Perks/Perks'
export default function Faq(){return <main className={styles.wrap}><FaqHero/><FaqCategories/><section className={styles.content}><QuestionList/><HelpSidebar/></section><Perks/></main>}
