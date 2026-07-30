import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const footerGroups = [
  ["Shop", [
    ["Men", "/shop?category=Men"], ["Women", "/shop?category=Women"], ["Kids", "/shop?category=Kids"],
    ["Footwear", "/shop?category=Footwear"], ["Accessories", "/shop?category=Accessories"], ["Brands", "/brands"],
    ["Watches", "/shop?category=Watches"], ["Beauty", "/shop?category=Beauty"],
  ]],
  ["Customer Service", [
    ["Contact Us", "/help/contact"], ["Shipping Policy", "/help/shipping-policy"],
    ["Returns & Exchanges", "/help/returns-exchanges"], ["FAQ", "/help/faq"],
    ["Track Order", "/order-history"], ["Size Guide", "/help/size-guide"],
  ]],
  ["Company", [
    ["About Us", "/company/about"], ["Careers", "/company/careers"],
    ["Privacy Policy", "/company/privacy"], ["Terms & Conditions", "/company/terms"],
    ["Sitemap", "/company/sitemap"],
  ]],
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.foot}>
        <div>
          <Link className={styles.logo} to="/">Shopora<span>.</span></Link>
          <p>Elevate your everyday style<br />with premium quality products.</p>
          <small>● ● ● ●</small>
        </div>
        {footerGroups.map(([title, links]) => (
          <div key={title}>
            <b>{title}</b>
            {links.map(([label, path]) => <Link to={path} key={label}>{label}</Link>)}
          </div>
        ))}
        <div className={styles.pay}>
          <b>Secure Payment</b>
          <p>100% secure payment<br />with trusted gateway.</p>
          <strong>VISA <span>●●</span> PayPal UPI</strong>
        </div>
      </div>
      <div className={styles.copyright}>© 2024 Shopora. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
