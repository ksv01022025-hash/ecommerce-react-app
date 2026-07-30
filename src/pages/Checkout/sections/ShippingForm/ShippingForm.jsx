import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useStripeCheckoutSessionMutation } from "../../../../redux/api/orderApi";
import { useCreateAddressMutation, useGetAddressesQuery } from "../../../../redux/api/addressApi";
import { saveShippingInfo } from "../../../../redux/features/cartSlice";
import styles from "./ShippingForm.module.css";

const states = ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];

function ShippingForm({ deliveryMethod, onDeliveryChange }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const formRef = useRef(null);
  const hasPrefilledAddress = useRef(false);
  const [createCheckout, { isLoading }] = useStripeCheckoutSessionMutation();
  const [createAddress, { isLoading: isSavingAddress }] = useCreateAddressMutation();
  const { data: addressData } = useGetAddressesQuery(undefined, { skip: !isAuthenticated });

  useEffect(() => {
    if (hasPrefilledAddress.current || !formRef.current || !addressData?.addresses?.length) return;
    const savedAddress = addressData.addresses.find((address) => address.isDefault) || addressData.addresses[0];
    const form = formRef.current;
    ["fullName", "mobile", "pincode", "addressLine1", "addressLine2", "city", "state", "landmark"].forEach((field) => {
      if (form.elements[field] && !form.elements[field].value) form.elements[field].value = savedAddress[field] || "";
    });
    hasPrefilledAddress.current = true;
  }, [addressData]);

  const submitPayment = async (event) => {
    event.preventDefault();
    setError("");
    if (!items.length) return setError("Add at least one product before checkout.");
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const shippingInfo = { fullName: data.fullName, mobile: data.mobile, pincode: data.pincode, addressLine1: data.addressLine1, addressLine2: data.addressLine2, city: data.city, state: data.state, landmark: data.landmark, delivery: deliveryMethod, orderNotes: data.orderNotes };
    dispatch(saveShippingInfo(shippingInfo));
    try {
      if (saveAddress) {
        const address = { fullName: shippingInfo.fullName, mobile: shippingInfo.mobile, pincode: shippingInfo.pincode, addressLine1: shippingInfo.addressLine1, addressLine2: shippingInfo.addressLine2, city: shippingInfo.city, state: shippingInfo.state, landmark: shippingInfo.landmark };
        await createAddress(address).unwrap();
      }
      const result = await createCheckout({ items: items.map(({ product, quantity }) => ({ product, quantity })), shippingInfo }).unwrap();
      window.location.assign(result.url);
    } catch (requestError) {
      setError(requestError?.data?.message || "Unable to start Stripe Checkout. Please login and try again.");
    }
  };

  return <form className={styles.address} onSubmit={submitPayment} ref={formRef}>
    <div className={styles.sectionHead}><h2>Shipping Address</h2><span>Already have an account? <Link to="/login" state={{ from: "/checkout" }}>Login</Link></span></div>
    <div className={styles.fields}>
      <label>Full Name*<input name="fullName" placeholder="Enter your full name" required /></label>
      <label>Mobile Number*<input name="mobile" pattern="[0-9+ ]{10,16}" placeholder="Enter your mobile number" required /></label>
      <label>Pincode*<input name="pincode" pattern="[0-9]{6}" placeholder="Enter pincode" required /></label>
      <label className={styles.wide}>Address Line 1*<input name="addressLine1" placeholder="House no., Building, Street, Area" required /></label>
      <label className={styles.wide}>Address Line 2 (Optional)<input name="addressLine2" placeholder="Apartment, Landmark, Area details" /></label>
      <label>City*<input name="city" placeholder="Enter city" required /></label>
      <label>State*<select name="state" defaultValue="" required><option value="" disabled>Select state</option>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
      <label>Landmark (Optional)<input name="landmark" placeholder="Nearby place or landmark" /></label>
    </div>
    <label className={styles.save}><input checked={saveAddress} onChange={(event) => setSaveAddress(event.target.checked)} type="checkbox" /> Save this address for faster checkout</label>
    <h2>Delivery Options</h2>
    <label className={`${styles.delivery} ${deliveryMethod === "standard" ? styles.selected : ""}`}><input checked={deliveryMethod === "standard"} onChange={() => onDeliveryChange("standard")} type="radio" name="delivery" value="standard" /><p><b>Standard Delivery</b><small>3–5 Business Days</small></p><strong>FREE</strong></label>
    <label className={`${styles.delivery} ${deliveryMethod === "express" ? styles.selected : ""}`}><input checked={deliveryMethod === "express"} onChange={() => onDeliveryChange("express")} type="radio" name="delivery" value="express" /><p><b>Express Delivery</b><small>1–2 Business Days</small></p><strong>₹149</strong></label>
    <h2>Order Notes <small>(Optional)</small></h2>
    <textarea name="orderNotes" placeholder="Add any notes about your order"></textarea>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <button className={styles.continue} disabled={isLoading || isSavingAddress || !items.length} type="submit">{isSavingAddress ? "Saving address…" : isLoading ? "Opening Stripe…" : "Pay securely with Stripe →"}</button>
  </form>;
}

export default ShippingForm;
