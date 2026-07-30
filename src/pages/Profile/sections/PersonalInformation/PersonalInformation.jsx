import { useState } from "react";
import { useUpdateProfileMutation } from "../../../../redux/api/userApi";
import styles from "./PersonalInformation.module.css";

const getInitials = (name = "") => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const getProfileForm = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  mobile: user?.mobile || "",
  dateOfBirth: user?.dateOfBirth?.slice(0, 10) || "",
  gender: user?.gender || "",
  occupation: user?.occupation || "",
  avatar: user?.avatar || "",
});
const today = new Date().toISOString().slice(0, 10);

const validateProfile = (form) => {
  const errors = {};
  if (!/^[\p{L}][\p{L}\p{M} .'’-]{1,59}$/u.test(form.name.trim())) errors.name = "Enter a valid name containing 2–60 characters.";
  if (form.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  const mobile = form.mobile.replace(/[\s()-]/g, "");
  if (mobile && !/^\+?[1-9]\d{9,14}$/.test(mobile)) errors.mobile = "Enter a valid 10–15 digit mobile number.";
  if (form.dateOfBirth && (form.dateOfBirth < "1900-01-01" || form.dateOfBirth > today)) errors.dateOfBirth = "Date of birth must be between 1900 and today.";
  if (form.occupation.trim().length > 80) errors.occupation = "Occupation cannot exceed 80 characters.";
  if (form.avatar) {
    try { const url = new URL(form.avatar); if (!["http:", "https:"].includes(url.protocol)) errors.avatar = "Use a valid HTTP or HTTPS image URL."; }
    catch { errors.avatar = "Enter a valid image URL."; }
  }
  return errors;
};

function PersonalInformation({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(() => getProfileForm(user));
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [updateProfile, requestState] = useUpdateProfileMutation();

  const displayed = isEditing ? form : getProfileForm(user);
  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const toggleEditing = () => {
    if (!isEditing) setForm(getProfileForm(user));
    setIsEditing((value) => !value);
    setMessage("");
    setErrors({});
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setMessage("");
    const validationErrors = validateProfile(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    try {
      await updateProfile({ ...form, name: form.name.trim(), email: form.email.trim().toLowerCase(), mobile: form.mobile.replace(/[\s()-]/g, ""), occupation: form.occupation.trim(), avatar: form.avatar.trim() }).unwrap();
      setMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      setMessage(error.data?.message || "Unable to update profile.");
    }
  };

  return (
    <section className={styles.card}>
      <header><h2>♙ Personal Information</h2><button onClick={toggleEditing} type="button">✎ {isEditing ? "Cancel" : "Edit"}</button></header>
      <form className={styles.form} onSubmit={saveProfile}>
        <div className={styles.photoBox}>
          <div className={styles.avatar}>{displayed.avatar ? <img src={displayed.avatar} alt={user.name} /> : getInitials(user.name)}</div>
          <label>Change Photo URL<input aria-invalid={Boolean(errors.avatar)} disabled={!isEditing} name="avatar" onChange={updateField} type="url" value={displayed.avatar} />{errors.avatar && <span className={styles.fieldError}>{errors.avatar}</span>}</label>
          <small>Use a JPG, PNG or GIF image URL.</small>
        </div>
        <div className={styles.fields}>
          <label>Full Name<input aria-invalid={Boolean(errors.name)} disabled={!isEditing} maxLength="60" minLength="2" name="name" onChange={updateField} required value={displayed.name} />{errors.name && <span className={styles.fieldError}>{errors.name}</span>}</label>
          <label>Email Address<input aria-invalid={Boolean(errors.email)} disabled={!isEditing} maxLength="254" name="email" onChange={updateField} required type="email" value={displayed.email} />{errors.email && <span className={styles.fieldError}>{errors.email}</span>}</label>
          <label>Mobile Number<input aria-invalid={Boolean(errors.mobile)} disabled={!isEditing} inputMode="tel" name="mobile" onChange={updateField} placeholder="+91 98765 43210" value={displayed.mobile} />{errors.mobile && <span className={styles.fieldError}>{errors.mobile}</span>}</label>
          <label>Date of Birth<input aria-invalid={Boolean(errors.dateOfBirth)} disabled={!isEditing} max={today} min="1900-01-01" name="dateOfBirth" onChange={updateField} type="date" value={displayed.dateOfBirth} />{errors.dateOfBirth && <span className={styles.fieldError}>{errors.dateOfBirth}</span>}</label>
          <label>Gender<select disabled={!isEditing} name="gender" onChange={updateField} value={displayed.gender}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></label>
          <label>Occupation<input aria-invalid={Boolean(errors.occupation)} disabled={!isEditing} maxLength="80" name="occupation" onChange={updateField} value={displayed.occupation} />{errors.occupation && <span className={styles.fieldError}>{errors.occupation}</span>}</label>
          {isEditing && <button className={styles.save} disabled={requestState.isLoading} type="submit">{requestState.isLoading ? "Saving…" : "Save Profile"}</button>}
          {message && <p className={requestState.isError ? styles.error : styles.success}>{message}</p>}
        </div>
      </form>
    </section>
  );
}

export default PersonalInformation;
