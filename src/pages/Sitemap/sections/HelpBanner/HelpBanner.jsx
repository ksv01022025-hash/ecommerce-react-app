import { Link } from 'react-router-dom'
import styles from './HelpBanner.module.css'
export default function HelpBanner(){return <section className={styles.help}><div><b>☏</b><div><h2>Can&apos;t find what you&apos;re looking for?</h2><p>Our support team is ready to help you.</p></div></div><Link to="/help/contact">Contact Us →</Link></section>}
