import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetAddressesQuery } from "../../redux/api/addressApi";
import { useGetRewardsQuery } from "../../redux/api/rewardApi";
import { useGetReturnsQuery } from "../../redux/api/returnApi";
import { useGetNotificationsQuery } from "../../redux/api/notificationApi";
import { useGetAccountSettingsQuery } from "../../redux/api/accountSettingsApi";
import { useGetBalanceQuery } from "../../redux/api/balanceApi";
import { useGetAccountSummaryQuery } from "../../redux/api/accountSummaryApi";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Benefits from "../OrderHistory/sections/Benefits/Benefits";
import AccountSummary from "./sections/AccountSummary/AccountSummary";
import AddressBook from "./sections/AddressBook/AddressBook";
import ChangePassword from "./sections/ChangePassword/ChangePassword";
import GoogleAccountSecurity from "./sections/GoogleAccountSecurity/GoogleAccountSecurity";
import PersonalInformation from "./sections/PersonalInformation/PersonalInformation";
import ProfileSidebar from "./sections/ProfileSidebar/ProfileSidebar";
import RecentOrders from "./sections/RecentOrders/RecentOrders";
import Rewards from "./sections/Rewards/Rewards";
import Returns from "./sections/Returns/Returns";
import Notifications from "./sections/Notifications/Notifications";
import AccountSettings from "./sections/AccountSettings/AccountSettings";
import AccountBalance from "./sections/AccountBalance/AccountBalance";
import styles from "./Profile.module.css";

export default function Profile() {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const ordersQuery = useMyOrdersQuery(
    { page: 1, limit: 4, sort: "newest" },
    { skip: !isAuthenticated },
  );
  const addressesQuery = useGetAddressesQuery(undefined, { skip: !isAuthenticated });
  const rewardsQuery = useGetRewardsQuery(undefined, { skip: !isAuthenticated });
  const returnsQuery = useGetReturnsQuery(undefined, { skip: !isAuthenticated });
  const notificationsQuery = useGetNotificationsQuery(undefined, { skip: !isAuthenticated });
  const accountSettingsQuery = useGetAccountSettingsQuery(undefined, { skip: !isAuthenticated });
  const balanceQuery = useGetBalanceQuery(undefined, { skip: !isAuthenticated });
  const accountSummaryQuery = useGetAccountSummaryQuery(undefined, { skip: !isAuthenticated });

  if (loading) return <main className={styles.profile}><p>Loading profile…</p></main>;

  if (!isAuthenticated) {
    return (
      <main className={styles.profile}>
        <h1>Profile</h1>
        <p>Please login to view your profile.</p>
        <Link to="/login" state={{ from: "/profile" }}>Login</Link>
      </main>
    );
  }

  const orders = ordersQuery.data?.orders || [];
  const addresses = addressesQuery.data?.addresses || [];
  const isAddressBook = location.pathname === "/profile/address-book";
  const isRewards = location.pathname === "/profile/rewards";
  const isReturns = location.pathname === "/profile/returns";
  const isNotifications = location.pathname === "/profile/notifications";
  const isAccountSettings = location.pathname === "/profile/settings";
  const isAccountBalance = location.pathname === "/profile/balance";
  const sectionTitle = isAddressBook ? "Address Book" : isRewards ? "Rewards & Points" : isReturns ? "Returns & Refunds" : isNotifications ? "Notifications" : isAccountSettings ? "Account Settings" : isAccountBalance ? "Account Balance" : "Profile";

  return (
    <main className={styles.profile}>
      <p className={styles.crumb}>Home › My Account › {sectionTitle}</p>
      <h1>{sectionTitle === "Profile" ? "My Profile" : sectionTitle}</h1>
      <p className={styles.subtitle}>{isAddressBook ? "Manage your saved delivery addresses" : isRewards ? "Earn and redeem rewards across Shopora" : isReturns ? "Request returns and track your refund status" : isNotifications ? "View updates and manage how Shopora contacts you" : isAccountSettings ? "Manage shopping preferences and account privacy" : isAccountBalance ? "View your Shopora balance and transaction history" : "Manage your personal information and account settings"}</p>

      <div className={styles.layout}>
        <ProfileSidebar user={user} wishlistCount={wishlistCount} />

        <div className={styles.center}>
          {isAddressBook ? <AddressBook addresses={addresses} isLoading={addressesQuery.isLoading} /> : isRewards ? <Rewards points={rewardsQuery.data?.points || 0} transactions={rewardsQuery.data?.transactions || []} /> : isReturns ? <Returns data={returnsQuery.data} isLoading={returnsQuery.isLoading} /> : isNotifications ? <Notifications data={notificationsQuery.data} isLoading={notificationsQuery.isLoading} /> : isAccountSettings ? <AccountSettings isLoading={accountSettingsQuery.isLoading} key={JSON.stringify(accountSettingsQuery.data?.settings || {})} settings={accountSettingsQuery.data?.settings} user={user} /> : isAccountBalance ? <AccountBalance data={balanceQuery.data} isLoading={balanceQuery.isLoading} /> : <><PersonalInformation user={user} />{user.hasPassword ? <ChangePassword /> : <GoogleAccountSecurity />}</>}
        </div>

        <aside className={styles.right}>
          <AccountSummary accountBalance={balanceQuery.data?.balance || 0} addressCount={addresses.length} orderCount={ordersQuery.data?.count || 0} paymentMethodCount={accountSummaryQuery.data?.paymentMethodCount || 0} rewardPoints={rewardsQuery.data?.points || 0} wishlistCount={wishlistCount} />
          <RecentOrders error={ordersQuery.error} isError={ordersQuery.isError} isLoading={ordersQuery.isLoading} orders={orders} refetch={ordersQuery.refetch} />
        </aside>
      </div>

      <Benefits />
    </main>
  );
}
