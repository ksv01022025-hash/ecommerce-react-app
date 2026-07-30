import { Link } from "react-router-dom";
import { useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation, useUpdateNotificationPreferencesMutation } from "../../../../redux/api/notificationApi";
import styles from "./Notifications.module.css";

const preferenceLabels = {
  orderUpdates: ["Order updates", "Shipping, delivery, and cancellation updates"],
  offers: ["Offers and promotions", "Sales, discounts, and personalized deals"],
  accountActivity: ["Account activity", "Security and important account changes"],
  rewards: ["Rewards and points", "Points earned, redeemed, and expiring"],
  email: ["Email notifications", "Also send enabled notifications by email"],
};

function Notifications({ data, isLoading }) {
  const [updatePreferences, preferenceState] = useUpdateNotificationPreferencesMutation();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead, markAllState] = useMarkAllNotificationsReadMutation();
  const notifications = data?.notifications || [];
  const preferences = data?.preferences || {};

  if (isLoading) return <section className={styles.card}><p>Loading notifications…</p></section>;

  return (
    <div className={styles.notifications}>
      <section className={styles.card}>
        <div className={styles.heading}><div><h2>Notifications</h2><p>{data?.unreadCount || 0} unread notification{data?.unreadCount === 1 ? "" : "s"}</p></div>{data?.unreadCount > 0 && <button disabled={markAllState.isLoading} onClick={() => markAllRead()} type="button">Mark all as read</button>}</div>
        {notifications.length === 0 && <p className={styles.empty}>You have no notifications yet.</p>}
        <div className={styles.list}>{notifications.map((notification) => <article className={notification.isRead ? styles.read : styles.unread} key={notification._id}><i>{notification.type === "order" ? "□" : notification.type === "return" ? "↶" : notification.type === "reward" ? "◇" : "♧"}</i><div><b>{notification.title}</b><p>{notification.message}</p><small>{new Date(notification.createdAt).toLocaleString("en-IN")}</small>{notification.link && <Link onClick={() => !notification.isRead && markRead(notification._id)} to={notification.link}>View details</Link>}</div>{!notification.isRead && <button aria-label={`Mark ${notification.title} as read`} onClick={() => markRead(notification._id)} title="Mark as read" type="button">✓</button>}</article>)}</div>
      </section>

      <section className={styles.card}>
        <div className={styles.heading}><div><h2>Notification Preferences</h2><p>Choose which updates you want to receive.</p></div>{preferenceState.isLoading && <small>Saving…</small>}</div>
        <div className={styles.preferences}>{Object.entries(preferenceLabels).map(([key, label]) => <label key={key}><span><b>{label[0]}</b><small>{label[1]}</small></span><input checked={preferences[key] ?? true} onChange={(event) => updatePreferences({ ...preferences, [key]: event.target.checked })} type="checkbox" /></label>)}</div>
        {preferenceState.isError && <p className={styles.error}>Unable to save notification preferences.</p>}
      </section>
    </div>
  );
}

export default Notifications;
