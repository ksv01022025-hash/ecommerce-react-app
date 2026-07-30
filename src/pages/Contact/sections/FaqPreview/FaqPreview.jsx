import { Link } from 'react-router-dom'
import styles from './FaqPreview.module.css'
const faqs=[['How long does shipping take?','Standard orders arrive within 3–5 business days.'],['What is your return policy?','Returns are accepted within seven days of delivery.'],['How can I track my order?','Use the tracking link sent after your order ships.'],['Do you offer cash on delivery?','Yes, cash on delivery is available in selected locations.']]
export default function FaqPreview(){return <section className={styles.faq}><div><h2>Frequently Asked Questions</h2><Link to="/help/faq">View All FAQs →</Link></div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>}
