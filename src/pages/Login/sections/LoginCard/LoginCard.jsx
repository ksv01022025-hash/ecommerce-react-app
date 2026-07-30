import LoginForm from "../LoginForm/LoginForm";
import WhyLogin from "../WhyLogin/WhyLogin";
import styles from "./LoginCard.module.css";

function LoginCard() {
  return (
    <section className={styles.loginCard}>
      <LoginForm />
      <WhyLogin />
    </section>
  );
}

export default LoginCard;
