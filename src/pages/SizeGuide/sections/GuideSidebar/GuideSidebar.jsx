import { Link } from 'react-router-dom'
import styles from './GuideSidebar.module.css'
export default function GuideSidebar(){return <aside><section className={styles.categories}><h2>Categories</h2><a className={styles.active}>♙ &nbsp; Men</a><a>♙ &nbsp; Women</a><a>♧ &nbsp; Kids</a><a>♧ &nbsp; Footwear</a><a>♧ &nbsp; Accessories</a></section><section className={styles.help}><h2>Need Help?</h2><p>If you're between sizes or need<br/>help finding the right fit, our<br/>support team is here to help.</p><Link to="/help/contact">Contact Support →</Link></section></aside>}
