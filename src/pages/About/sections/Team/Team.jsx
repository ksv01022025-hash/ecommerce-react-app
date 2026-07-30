import styles from './Team.module.css'
import { members } from '../../data/aboutData'
export default function Team(){return <section className={styles.team}><h2>Our Team</h2><p>The passionate people behind Shopora.</p><div>{members.map(([name,role,photo])=><article key={name}><img src={`https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=180&q=80`} alt={name}/><section><h3>{name}</h3><p>{role}</p><b>in ♥ ◎</b></section></article>)}</div></section>}
