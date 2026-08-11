import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";
import { PaymentCancelled, PaymentSuccess } from "./pages/Checkout/PaymentResult";
import Deals from "./pages/Deals";
import Login from "./pages/Login";
import GoogleOAuthCallback from "./pages/Login/GoogleOAuthCallback";
import NewArrivals from "./pages/NewArrivals";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import WishList from "./pages/WishList";
import Product from "./pages/Product";
import Layout from "./Layout.jsx";
import ForgotPassword from "./pages/PasswordReset/ForgotPassword";
import ResetPassword from "./pages/PasswordReset/ResetPassword";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";
import SizeGuide from "./pages/SizeGuide";
import About from "./pages/About";
import Careers from "./pages/Careers";
import TermsConditions from "./pages/TermsConditions";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import ReturnsExchanges from "./pages/ReturnsExchanges";
import ShippingPolicy from "./pages/ShippingPolicy";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/google/callback" element={<GoogleOAuthCallback />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/company/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/company/sitemap" element={<Sitemap />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/help/size-guide" element={<SizeGuide />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/company/terms" element={<TermsConditions />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/help/faq" element={<Faq />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/help/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/help/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/payment/success" element={<PaymentSuccess />} />
            <Route path="/checkout/payment/cancelled" element={<PaymentCancelled />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/address-book" element={<Profile />} />
            <Route path="/profile/rewards" element={<Profile />} />
            <Route path="/profile/returns" element={<Profile />} />
            <Route path="/profile/notifications" element={<Profile />} />
            <Route path="/profile/settings" element={<Profile />} />
            <Route path="/profile/balance" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
