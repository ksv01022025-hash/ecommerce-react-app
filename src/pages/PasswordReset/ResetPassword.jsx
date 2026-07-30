import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import styles from "./PasswordReset.module.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState(null);
  const [resetPassword, requestState] = useResetPasswordMutation();
  const submit = async (event) => {
    event.preventDefault(); setMessage(null);
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/.test(form.password)) return setMessage({ type: "error", text: "Use 8–72 characters with uppercase, lowercase, and a number." });
    if (form.password !== form.confirmPassword) return setMessage({ type: "error", text: "Passwords do not match." });
    try { const result = await resetPassword({ token, password: form.password }).unwrap(); setMessage({ type: "success", text: result.message }); setForm({ password: "", confirmPassword: "" }); }
    catch (error) { setMessage({ type: "error", text: error.data?.message || "Unable to reset your password." }); }
  };
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  return <main className={styles.page}><section className={styles.card}><h1>Create New Password</h1><p>Choose a strong password containing uppercase, lowercase, and a number.</p><form onSubmit={submit}><label>New Password<input autoComplete="new-password" maxLength="72" minLength="8" name="password" onChange={update} required type="password" value={form.password} /></label><label>Confirm Password<input autoComplete="new-password" maxLength="72" minLength="8" name="confirmPassword" onChange={update} required type="password" value={form.confirmPassword} /></label><button disabled={requestState.isLoading} type="submit">{requestState.isLoading ? "Resetting…" : "Reset Password"}</button></form>{message && <p className={message.type === "error" ? styles.error : styles.success} role={message.type === "error" ? "alert" : "status"}>{message.text}</p>}<p><Link to="/login">Return to Login</Link></p></section></main>;
}
