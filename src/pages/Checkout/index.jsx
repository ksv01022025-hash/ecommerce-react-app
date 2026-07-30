import { useState } from "react";
import CheckoutSteps from "./sections/CheckoutSteps/CheckoutSteps";
import ShippingForm from "./sections/ShippingForm/ShippingForm";
import OrderSummary from "./sections/OrderSummary/OrderSummary";
import Benefits from "./sections/Benefits/Benefits";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  return (
     <>
      <main className={styles.wrap}>
        <div className={styles.crumb}>Home › Cart › Checkout</div>
        <h1 className={styles.pageTitle}>Checkout <small>♙ Secure Checkout</small></h1>
        <div className={styles.layout}>
          <section>
            <CheckoutSteps />
            <ShippingForm deliveryMethod={deliveryMethod} onDeliveryChange={setDeliveryMethod} />
          </section>
          <OrderSummary deliveryMethod={deliveryMethod} />
        </div>
        <Benefits />
      </main>
    </>
  )
}
