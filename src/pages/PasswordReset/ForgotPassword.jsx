import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/api/authApi";
import styles from "./PasswordReset.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [forgotPassword, requestState] = useForgotPasswordMutation();
  const submit = async (event) => {
    event.preventDefault(); setResult(null);
    try { setResult({ type: "success", ...(await forgotPassword({ email: email.trim().toLowerCase() }).unwrap()) }); }
    catch (error) { setResult({ type: "error", message: error.data?.message || "Unable to create a reset link." }); }
  };
  return <main className={styles.page}><section className={styles.card}><h1>Forgot Password?</h1><p>Enter your account email. Reset links expire after 15 minutes and can only be used once.</p><form onSubmit={submit}><label>Email Address<input autoComplete="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label><button disabled={requestState.isLoading} type="submit">{requestState.isLoading ? "Creating Link…" : "Send Reset Link"}</button></form>{result && <div className={result.type === "error" ? styles.error : styles.success} role={result.type === "error" ? "alert" : "status"}>{result.message}{result.resetUrl && <p className={styles.resetLink}>Development reset link:<Link to={new URL(result.resetUrl).pathname}>{result.resetUrl}</Link></p>}</div>}<p><Link to="/login">← Return to Login</Link></p></section></main>;
}
