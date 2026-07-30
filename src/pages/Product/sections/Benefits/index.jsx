import styles from './Benefits.module.css'

const benefits = [['♧', 'Free Shipping', 'On orders over ₹999'], ['⟳', 'Easy Returns', '7-day return policy'], ['♦', 'Secure Payment', '100% secure checkout'], ['♙', '24/7 Support', "We're here for you"]]

function Benefits() {
  return <section className={styles.benefits}>{benefits.map(([icon, title, description]) => <div key={title}>{icon} <b>{title}</b><small>{description}</small></div>)}</section>
}

export default Benefits
