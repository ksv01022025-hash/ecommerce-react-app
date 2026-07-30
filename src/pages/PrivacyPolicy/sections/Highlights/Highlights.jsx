import styles from './Highlights.module.css'
import { highlights } from '../../data/privacyData'
export default function Highlights(){return <section className={styles.highlights}>{highlights.map(([icon,title,lines])=><article key={title}><b>{icon}</b><h2>{title}</h2><p>{lines.map((line,index)=><span key={line}>{line}{index<lines.length-1&&<br/>}</span>)}</p></article>)}</section>}
