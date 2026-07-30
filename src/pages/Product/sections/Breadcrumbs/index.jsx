import styles from './Breadcrumbs.module.css'

function Breadcrumbs({ items }) {
  return <div className={styles.crumb}>{items.join(' › ')}</div>
}

export default Breadcrumbs
