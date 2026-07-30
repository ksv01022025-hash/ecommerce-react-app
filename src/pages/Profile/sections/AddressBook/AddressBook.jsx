import { useState } from "react";
import { useCreateAddressMutation, useDeleteAddressMutation, useSetDefaultAddressMutation, useUpdateAddressMutation } from "../../../../redux/api/addressApi";
import styles from "./AddressBook.module.css";

const emptyAddress = { label: "Home", fullName: "", mobile: "", pincode: "", addressLine1: "", addressLine2: "", city: "", state: "", landmark: "", isDefault: false };

function AddressBook({ addresses, isLoading }) {
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [createAddress, createState] = useCreateAddressMutation();
  const [updateAddress, updateState] = useUpdateAddressMutation();
  const [deleteAddress, deleteState] = useDeleteAddressMutation();
  const [setDefaultAddress, defaultState] = useSetDefaultAddressMutation();
  const isSaving = createState.isLoading || updateState.isLoading;

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value }));
  const openNew = () => { setForm(emptyAddress); setEditingId(null); setMessage(""); setShowForm(true); };
  const openEdit = (address) => { setForm({ ...emptyAddress, ...address }); setEditingId(address._id); setMessage(""); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingId(null); setMessage(""); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (editingId) await updateAddress({ id: editingId, ...form }).unwrap();
      else await createAddress(form).unwrap();
      setMessage(editingId ? "Address updated successfully." : "Address added successfully.");
      setForm(emptyAddress);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      setMessage(error.data?.message || "Unable to save address.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this saved address?")) return;
    try { await deleteAddress(id).unwrap(); } catch { setMessage("Unable to remove address."); }
  };

  return (
    <section className={styles.card}>
      <header><div><h2>⌖ Address Book</h2><p>Manage addresses for faster checkout</p></div><button onClick={openNew} type="button">＋ Add New Address</button></header>
      {message && <p className={createState.isError || updateState.isError ? styles.error : styles.success} role="status">{message}</p>}

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
          <label>Address Label<input name="label" onChange={updateField} placeholder="Home or Office" value={form.label} /></label>
          <label>Full Name*<input name="fullName" onChange={updateField} required value={form.fullName} /></label>
          <label>Mobile Number*<input inputMode="numeric" name="mobile" onChange={updateField} required value={form.mobile} /></label>
          <label>Pincode*<input inputMode="numeric" name="pincode" onChange={updateField} required value={form.pincode} /></label>
          <label className={styles.wide}>Address Line 1*<input name="addressLine1" onChange={updateField} required value={form.addressLine1} /></label>
          <label className={styles.wide}>Address Line 2<input name="addressLine2" onChange={updateField} value={form.addressLine2} /></label>
          <label>City*<input name="city" onChange={updateField} required value={form.city} /></label>
          <label>State*<input name="state" onChange={updateField} required value={form.state} /></label>
          <label className={styles.wide}>Landmark<input name="landmark" onChange={updateField} value={form.landmark} /></label>
          <label className={`${styles.wide} ${styles.check}`}><input checked={form.isDefault} name="isDefault" onChange={updateField} type="checkbox" /> Make this my default address</label>
          <div className={styles.formActions}><button disabled={isSaving} type="submit">{isSaving ? "Saving…" : editingId ? "Update Address" : "Save Address"}</button><button onClick={closeForm} type="button">Cancel</button></div>
        </form>
      )}

      {isLoading && <p className={styles.status}>Loading saved addresses…</p>}
      {!isLoading && addresses.length === 0 && !showForm && <div className={styles.empty}><i>⌖</i><h3>No saved addresses</h3><p>Add an address to make checkout faster.</p><button onClick={openNew} type="button">Add Address</button></div>}
      <div className={styles.grid}>
        {addresses.map((address) => (
          <article className={styles.address} key={address._id}>
            <div className={styles.addressHead}><b>{address.label || "Address"}</b>{address.isDefault && <span>Default</span>}</div>
            <h3>{address.fullName}</h3>
            <p>{address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}<br />{address.landmark && <>{address.landmark}<br /></>}{address.city}, {address.state} – {address.pincode}<br />Mobile: {address.mobile}</p>
            <footer><button onClick={() => openEdit(address)} type="button">Edit</button><button disabled={deleteState.isLoading} onClick={() => handleDelete(address._id)} type="button">Delete</button>{!address.isDefault && <button disabled={defaultState.isLoading} onClick={() => setDefaultAddress(address._id)} type="button">Set as Default</button>}</footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AddressBook;
