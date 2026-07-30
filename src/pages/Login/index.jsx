import styles from "./Login.module.css";
import Benefits from "./sections/Benefits/Benefits";
import LoginCard from "./sections/LoginCard/LoginCard";


export default function Login() {
  return (
      <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › Login</div>
        <LoginCard />
        <Benefits />
      </main>
    </>
  )
}
