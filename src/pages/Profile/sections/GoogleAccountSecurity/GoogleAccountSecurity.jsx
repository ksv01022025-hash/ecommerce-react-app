import styles from "./GoogleAccountSecurity.module.css";

export default function GoogleAccountSecurity() {
  return (
    <section className={styles.card}>
      <header>
        <h2>Security managed by Google</h2>
      </header>
      <p>
        You use Google to sign in to Shopora. This account has no Shopora
        password, so password changes and password resets are not required.
      </p>
      <a
        href="https://myaccount.google.com/security"
        rel="noreferrer"
        target="_blank"
      >
        Manage Google security
      </a>
    </section>
  );
}
