import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const navigation = [['Home', '/'], ['Shop', '/shop'], ['Categories', '/categories'], ['Deals', '/deals'], ['New Arrivals', '/new-arrivals'], ['Brands', '/brands']]

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">Shopora<span>.</span></Link>
      <nav className={styles.nav} aria-label="Main navigation">
        {navigation.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
      </nav>
      <div className={styles.actions}>
        <div className={styles.search}>Search products... ⌕</div>
        <button type="button" aria-label="Account">♙</button>
        <button type="button" aria-label="Wishlist">♡</button>
        <button type="button" aria-label="Shopping bag">♧<em>2</em></button>
      </div>
    </header>
  )
}

export default Header
