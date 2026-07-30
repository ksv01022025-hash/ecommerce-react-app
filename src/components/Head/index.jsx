import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useGetWishlistQuery } from "../../redux/api/wishlistApi";
import styles from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(window.location.search).get("keyword") || "");
  const accountRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.cartItems.reduce((total, item) => total + (item.quantity || 1), 0));
  useGetMeQuery();
  useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const closeMenu = () => setIsMenuOpen(false);
  const closeAccount = () => setIsAccountOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = searchTerm.trim();
    navigate(keyword ? `/shop?keyword=${encodeURIComponent(keyword)}` : "/shop");
    closeMenu();
  };

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!accountRef.current?.contains(event.target)) closeAccount();
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeAccount();
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      closeAccount();
      navigate("/");
    } catch {
      // Keep the menu open so the user can retry a failed logout request.
    }
  };

  return (
    <header className={styles.siteHeader}>
      <Link className={styles.brand} to="/" onClick={closeMenu}>Shopora<span>.</span></Link>
      <nav
        id="main-navigation"
        className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ""}`}
        aria-label="Main navigation"
      >
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} end to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/shop" onClick={closeMenu}>Shop</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/categories" onClick={closeMenu}>Categories</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/deals" onClick={closeMenu}>Deals</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/new-arrivals" onClick={closeMenu}>New Arrivals</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/brands" onClick={closeMenu}>Brands</NavLink>
      </nav>
      <div className={styles.headerActions}>
        <form className={styles.search} role="search" onSubmit={handleSearch}>
          <input
            aria-label="Search products"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            value={searchTerm}
          />
          <button type="submit" aria-label="Submit product search">⌕</button>
        </form>
        <div className={styles.account} ref={accountRef}>
          <button
            className={styles.iconButton}
            type="button"
            aria-label="Account"
            aria-controls="account-menu"
            aria-expanded={isAccountOpen}
            onClick={() => setIsAccountOpen((open) => !open)}
          >
            ♙
          </button>
          {isAccountOpen && (
            <div className={styles.accountMenu} id="account-menu">
              {isAuthenticated ? (
                <>
                  <p><b>{user?.name}</b><small>{user?.email}</small></p>
                  <Link to="/profile" onClick={closeAccount}>Profile</Link>
                  <Link to="/order-history" onClick={closeAccount}>Order History</Link>
                  <button disabled={isLoggingOut} onClick={handleLogout} type="button">
                    {isLoggingOut ? "Logging out…" : "Logout"}
                  </button>
                </>
              ) : (
                <Link to="/login" state={{ from: location.pathname }} onClick={closeAccount}>Login</Link>
              )}
            </div>
          )}
        </div>
        <Link className={`${styles.iconButton} ${styles.wishlist}`} to="/wishlist" aria-label={`Wishlist with ${wishlistCount} items`}>
          ♡{wishlistCount > 0 && <em>{wishlistCount}</em>}
        </Link>
        <Link className={`${styles.iconButton} ${styles.bag}`} to="/checkout" aria-label={`Shopping bag with ${cartCount} items`}>
          ♧{cartCount > 0 && <em>{cartCount}</em>}
        </Link>
      </div>
      <button
        className={styles.mobileMenu}
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="main-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? "×" : "☰"}
      </button>
    </header>
  );
}

export default Header;
