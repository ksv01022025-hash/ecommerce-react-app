import styles from './ContactStrip.module.css'
import { contactItems } from '../../data/contactData'
export default function ContactStrip(){return <section className={styles.strip}>{contactItems.map(([icon,title,lines])=><div className={styles.item} key={title}><b>{icon}</b><p><strong>{title}</strong><span>{lines.map((line,index)=><span key={line}>{line}{index<lines.length-1&&<br/>}</span>)}</span></p></div>)}</section>}
