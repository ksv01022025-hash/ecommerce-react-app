import styles from "./AnnouncementBar.module.css";

function AnnouncementBar() {
  return (
    <div className={styles.announcement}>
      <span>♧</span> Free Shipping on Orders Over ₹999 <i></i> Easy 7-Day
      Returns
    </div>
  );
}

export default AnnouncementBar;
