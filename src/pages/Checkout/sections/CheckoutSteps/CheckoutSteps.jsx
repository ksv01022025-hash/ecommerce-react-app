import { Fragment } from "react";
import styles from "./CheckoutSteps.module.css";

const steps = [
  ["Shipping", "Delivery Address"],
  ["Payment", "Order Payment Method"],
  ["Review", "Order Review"],
  ["Confirmation", "Order Placed"],
];

function CheckoutSteps() {
  return (
    <div className={styles.steps}>
      {steps.map(([title, description], index) => (
        <Fragment key={title}>
          <div className={index === 0 ? styles.active : undefined}>
            <b>{index + 1}</b>
            <p><strong>{title}</strong><small>{description}</small></p>
          </div>
          {index < steps.length - 1 && <i></i>}
        </Fragment>
      ))}
    </div>
  );
}

export default CheckoutSteps;
