import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
import styles from "./GoogleOAuthCallback.module.css";

export default function GoogleOAuthCallback() {
  const navigate = useNavigate();
  const { isError, isSuccess } = useGetMeQuery();
  useEffect(() => {
    if (!isSuccess) return;
    const storedDestination = sessionStorage.getItem("oauthReturnTo");
    sessionStorage.removeItem("oauthReturnTo");
    const destination = storedDestination?.startsWith("/") && !storedDestination.startsWith("//") ? storedDestination : "/";
    navigate(destination, { replace: true });
  }, [isSuccess, navigate]);
  return <main className={styles.page}><section><h1>{isError ? "Google sign-in failed" : "Completing Google sign-in…"}</h1><p>{isError ? "The Shopora session could not be restored. Please try signing in again." : "Please wait while we securely restore your Shopora account."}</p>{isError && <Link to="/login">Return to login</Link>}</section></main>;
}
