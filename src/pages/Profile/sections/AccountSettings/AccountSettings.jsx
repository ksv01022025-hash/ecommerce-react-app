import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteAccountMutation, useUpdateAccountSettingsMutation } from "../../../../redux/api/accountSettingsApi";
import styles from "./AccountSettings.module.css";

function AccountSettings({ settings, isLoading, user }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isGoogleOnly = !user?.hasPassword && user?.authProviders?.includes("google");
  const googleVerified = searchParams.get("googleReauth") === "success";
  const [form, setForm] = useState({ language: "en", currency: "INR", personalizedRecommendations: true, saveBrowsingHistory: true, ...settings });
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateSettings, updateState] = useUpdateAccountSettingsMutation();
  const [deleteAccount, deleteState] = useDeleteAccountMutation();

  const saveSettings = async (event) => {
    event.preventDefault();
    setSettingsMessage("");
    try { const result = await updateSettings(form).unwrap(); setSettingsMessage(result.message); }
    catch (error) { setSettingsMessage(error.data?.message || "Unable to update account settings."); }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setDeleteMessage("");
    if (confirmText !== "DELETE") return setDeleteMessage("Type DELETE to confirm account deletion.");
    try { await deleteAccount(isGoogleOnly ? {} : { password }).unwrap(); navigate("/"); }
    catch (error) { setDeleteMessage(error.data?.message || "Unable to delete your account."); }
  };

  const verifyGoogle = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "/api/v1";
    window.location.assign(`${apiUrl}/oauth/google/reauth?purpose=delete_account`);
  };

  if (isLoading) return <section className={styles.card}><p>Loading account settings…</p></section>;

  return (
    <div className={styles.settings}>
      <section className={styles.card}>
        <h2>Shopping Preferences</h2><p>Choose how prices and content are displayed.</p>
        <form onSubmit={saveSettings}>
          <div className={styles.row}><label>Language<select onChange={(event) => setForm({ ...form, language: event.target.value })} value={form.language}><option value="en">English</option><option value="hi">Hindi</option><option value="ta">Tamil</option></select></label><label>Currency<select onChange={(event) => setForm({ ...form, currency: event.target.value })} value={form.currency}><option value="INR">Indian Rupee (₹)</option><option value="USD">US Dollar ($)</option></select></label></div>
          <div className={styles.toggles}><label><span><b>Personalized recommendations</b><small>Use your activity to suggest products you may like.</small></span><input checked={form.personalizedRecommendations} onChange={(event) => setForm({ ...form, personalizedRecommendations: event.target.checked })} type="checkbox" /></label><label><span><b>Save browsing history</b><small>Remember recently viewed products on your account.</small></span><input checked={form.saveBrowsingHistory} onChange={(event) => setForm({ ...form, saveBrowsingHistory: event.target.checked })} type="checkbox" /></label></div>
          <button disabled={updateState.isLoading} type="submit">{updateState.isLoading ? "Saving…" : "Save Settings"}</button>
        </form>
        {settingsMessage && <p className={updateState.isError ? styles.error : styles.success} role="status">{settingsMessage}</p>}
      </section>

      <section className={`${styles.card} ${styles.danger}`}>
        <h2>Delete Account</h2><p>This permanently deletes your profile, addresses, wishlist, orders, returns, rewards, and reviews. This action cannot be undone.</p>
        {isGoogleOnly && !googleVerified && <button onClick={verifyGoogle} type="button">Verify with Google</button>}
        {isGoogleOnly && googleVerified && <p className={styles.success}>Google account verified. This authorization expires in 10 minutes.</p>}
        <form onSubmit={handleDelete}>
          {!isGoogleOnly && <label>Password<input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label>}
          <label>Type DELETE to confirm<input autoComplete="off" onChange={(event) => setConfirmText(event.target.value)} placeholder="DELETE" required value={confirmText} /></label>
          <button disabled={deleteState.isLoading || confirmText !== "DELETE" || (isGoogleOnly && !googleVerified)} type="submit">{deleteState.isLoading ? "Deleting…" : "Delete My Account"}</button>
        </form>
        {deleteMessage && <p className={styles.error} role="alert">{deleteMessage}</p>}
      </section>
    </div>
  );
}

export default AccountSettings;
