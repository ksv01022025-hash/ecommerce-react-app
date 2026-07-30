import { Link } from 'react-router-dom'
import styles from './SitemapCard.module.css'
export default function SitemapCard({description,icon,id,links,title}){return <article className={styles.card} id={id}><div className={styles.icon}>{icon}</div><h2>{title}</h2><p>{description}</p>{links.map(([label,path])=><Link to={path} key={label}>{label}<b>→</b></Link>)}</article>}
