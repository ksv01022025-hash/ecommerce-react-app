import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../../redux/api/authApi";
import { useLazyGetReferralQuery } from "../../../../redux/api/referralApi";
import styles from "./ProfileSidebar.module.css";

const getInitials = (name = "") => name
  .split(" ")
  .map((part) => part[0])
  .slice(0, 2)
  .join("")
  .toUpperCase();

function ProfileSidebar({ user, wishlistCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout, logoutState] = useLogoutMutation();
  const [getReferral, referralState] = useLazyGetReferralQuery();
  const [shareMessage, setShareMessage] = useState("");

  const openInvite = async () => {
    setShareMessage("");
    try { await getReferral().unwrap(); }
    catch (error) { setShareMessage(error.data?.message || "Unable to create your invitation link."); }
  };

  const copyInvite = async () => {
    try { await navigator.clipboard.writeText(referralState.data.referralUrl); setShareMessage("Invitation link copied."); }
    catch { setShareMessage("Copy failed. Select and copy the link manually."); }
  };

  const shareInvite = async () => {
    if (!navigator.share) return copyInvite();
    try { await navigator.share({ title: "Join Shopora", text: "Join Shopora with my referral link and earn 25 welcome points.", url: referralState.data.referralUrl }); }
    catch (error) { if (error.name !== "AbortError") setShareMessage("Unable to share the invitation."); }
  };

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.person}>
        <div>{getInitials(user.name)}</div>
        <p><b>{user.name}</b><small>{user.email}</small></p>
      </div>
      <nav>
        <Link className={location.pathname === "/profile" ? styles.active : undefined} to="/profile">♙ Profile Information</Link>
        <Link className={location.pathname === "/profile/address-book" ? styles.active : undefined} to="/profile/address-book">⌖ Address Book</Link>
        <Link to="/order-history">▣ My Orders</Link>
        <Link to="/wishlist">♡ Wishlist <b>{wishlistCount}</b></Link>
        <Link className={location.pathname === "/profile/rewards" ? styles.active : undefined} to="/profile/rewards">♢ Rewards & Points</Link>
        <span>▤ Payment Methods</span>
        <Link className={location.pathname === "/profile/returns" ? styles.active : undefined} to="/profile/returns">◯ Returns & Refunds</Link>
        <Link className={location.pathname === "/profile/notifications" ? styles.active : undefined} to="/profile/notifications">♧ Notifications</Link>
        <Link className={location.pathname === "/profile/settings" ? styles.active : undefined} to="/profile/settings">⚙ Account Settings</Link>
        <button disabled={logoutState.isLoading} onClick={handleLogout} type="button">
          ⇥ {logoutState.isLoading ? "Logging out…" : "Logout"}
        </button>
      </nav>
      <div className={styles.invite} id="invite">
        <i>🎁</i>
        <p><b>Invite Friends & Get Rewards</b><small>Earn 50 points when a friend joins.</small>{!referralState.data && <button disabled={referralState.isFetching} onClick={openInvite} type="button">{referralState.isFetching ? "Creating…" : "Invite Now →"}</button>}{referralState.data && <span className={styles.referral}><strong>Code: {referralState.data.code}</strong><input aria-label="Referral link" readOnly value={referralState.data.referralUrl} /><em>{referralState.data.referredCount} friend{referralState.data.referredCount === 1 ? "" : "s"} joined</em><span><button onClick={copyInvite} type="button">Copy Link</button><button onClick={shareInvite} type="button">Share</button></span></span>}{shareMessage && <small className={styles.shareMessage} role="status">{shareMessage}</small>}</p>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
