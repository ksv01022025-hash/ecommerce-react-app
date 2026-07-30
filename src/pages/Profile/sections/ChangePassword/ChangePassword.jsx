import { useState } from "react";
import { useUpdatePasswordMutation } from "../../../../redux/api/userApi";
import styles from "./ChangePassword.module.css";

const emptyForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

function ChangePassword() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [updatePassword, requestState] = useUpdatePasswordMutation();
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("error");
    if (!form.currentPassword) return setMessage("Enter your current password.");
    if (form.currentPassword === form.newPassword) return setMessage("New password must be different from your current password.");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/.test(form.newPassword)) return setMessage("Use 8–72 characters with uppercase, lowercase, and a number.");
    if (form.newPassword !== form.confirmPassword) return setMessage("New passwords do not match.");
    try {
      const result = await updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }).unwrap();
      setMessageType("success");
      setMessage(result.message || "Password updated successfully.");
      setForm(emptyForm);
    } catch (error) {
      setMessageType("error");
      setMessage(error.data?.message || "Unable to update password.");
    }
  };

  return (
    <section className={styles.card}>
      <header><h2>▣ Change Password</h2></header>
      <form onSubmit={handleSubmit}>
        <label>Current Password<input autoComplete="current-password" maxLength="72" name="currentPassword" onChange={updateField} required type="password" value={form.currentPassword} /></label>
        <label>New Password<input aria-describedby="password-requirements" autoComplete="new-password" maxLength="72" minLength="8" name="newPassword" onChange={updateField} required type="password" value={form.newPassword} /><small id="password-requirements">8–72 characters, including uppercase, lowercase, and a number.</small></label>
        <label>Confirm New Password<input aria-invalid={Boolean(form.confirmPassword && form.newPassword !== form.confirmPassword)} autoComplete="new-password" maxLength="72" minLength="8" name="confirmPassword" onChange={updateField} required type="password" value={form.confirmPassword} /></label>
        <button disabled={requestState.isLoading} type="submit">{requestState.isLoading ? "Updating…" : "Update Password"}</button>
        {message && <p className={messageType === "error" ? styles.error : styles.success} role={messageType === "error" ? "alert" : "status"}>{message}</p>}
      </form>
    </section>
  );
}

export default ChangePassword;
