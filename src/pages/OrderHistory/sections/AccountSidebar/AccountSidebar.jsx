import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../../redux/api/authApi";
import styles from "./AccountSidebar.module.css";

function AccountSidebar() {
  const user = useSelector((state) => state.auth.user);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/");
  };

  return (
    <aside>
      <section className={styles.profile}>
        <div className={styles.person}>
          <b>{initials}</b>
          <p><strong>{user?.name}</strong><small>{user?.email}</small></p>
        </div>
        <Link to="/profile">♙ Profile Information</Link>
        <Link className={styles.active} to="/order-history">▣ My Orders</Link>
        <Link to="/wishlist">♡ Wishlist</Link>
        <button disabled={isLoading} onClick={handleLogout} type="button">⇥ {isLoading ? "Logging out…" : "Logout"}</button>
      </section>
      <section className={styles.invite}>
        <i>♧</i>
        <p>
          <b>Invite Friends & Get Rewards</b>
          <small>Refer your friends and earn<br />exciting rewards.</small>
          <Link to="/profile#invite">Invite Now →</Link>
        </p>
      </section>
    </aside>
  );
}

export default AccountSidebar;
