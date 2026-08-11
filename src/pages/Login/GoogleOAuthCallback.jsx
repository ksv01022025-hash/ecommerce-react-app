import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
import { getOAuthErrorMessage, getSafeOAuthDestination } from "./oauth";
import styles from "./GoogleOAuthCallback.module.css";

export default function GoogleOAuthCallback() {
  const navigate = useNavigate();
  const [timedOut, setTimedOut] = useState(false);
  const { error, isError, isFetching, isSuccess, refetch } = useGetMeQuery();

  useEffect(() => {
    if (!isSuccess) return;
    const storedDestination = sessionStorage.getItem("oauthReturnTo");
    sessionStorage.removeItem("oauthReturnTo");
    navigate(getSafeOAuthDestination(storedDestination), { replace: true });
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!isFetching || isSuccess || isError) return undefined;
    const timeout = window.setTimeout(() => setTimedOut(true), 15000);
    return () => window.clearTimeout(timeout);
  }, [isError, isFetching, isSuccess]);

  const hasFailed = isError || timedOut;
  const retry = () => {
    setTimedOut(false);
    refetch();
  };

  return (
    <main className={styles.page}>
      <section>
        <h1>{hasFailed ? "Google sign-in failed" : "Completing Google sign-in…"}</h1>
        <p>{hasFailed ? getOAuthErrorMessage(error, timedOut) : "Please wait while we securely restore your Shopora account."}</p>
        {hasFailed && <div className={styles.actions}><button onClick={retry} type="button">Try again</button><Link to="/login">Return to login</Link></div>}
      </section>
    </main>
  );
}
