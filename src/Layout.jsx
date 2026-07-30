import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Head";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <AnnouncementBar />

      <Header />
   
        <Outlet />
     

      <Footer />
    </>
  );
}

export default Layout;
