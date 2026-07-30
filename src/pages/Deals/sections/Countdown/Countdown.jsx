import { Fragment, useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const calculateTime = (endsAt) => {
  const remaining = Math.max(new Date(endsAt).getTime() - Date.now(), 0);
  return [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor((remaining / 3600000) % 24), "Hours"],
    [Math.floor((remaining / 60000) % 60), "Mins"],
    [Math.floor((remaining / 1000) % 60), "Secs"],
  ];
};

function Countdown({ endsAt }) {
  const [countdown, setCountdown] = useState(() => calculateTime(endsAt));

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculateTime(endsAt)), 1000);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  return (
    <div className={styles.count}>
      {countdown.map(([value, label], index) => (
        <Fragment key={label}>
          <div><b>{String(value).padStart(2, "0")}</b><small>{label}</small></div>
          {index < countdown.length - 1 && <i>:</i>}
        </Fragment>
      ))}
    </div>
  );
}

export default Countdown;
