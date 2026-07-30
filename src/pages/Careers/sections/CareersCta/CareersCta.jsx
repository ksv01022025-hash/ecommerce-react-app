import { Link } from 'react-router-dom'
import styles from './CareersCta.module.css'
export default function CareersCta(){return <section className={styles.cta}><b>✉</b><div><h2>Be a part of our journey</h2><p>Join us in building India's most loved online shopping destination.</p></div><Link to="/help/contact">Explore Opportunities →</Link></section>}
