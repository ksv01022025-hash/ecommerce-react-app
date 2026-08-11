import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../../../redux/api/authApi";
import { buildGoogleOAuthUrl } from "../../oauth";
import styles from "./LoginForm.module.css";

const socialProviders = [
  ["G", "Google"],
  ["f", "Facebook"],
  ["●", "Apple"],
];

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || "";
  const oauthError = searchParams.get("oauthError") || "";
  const [mode, setMode] = useState(() => referralCode ? "register" : "login");
  const [validationError, setValidationError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [login, loginState] = useLoginMutation();
  const [register, registerState] = useRegisterMutation();
  const isRegistering = mode === "register";
  const requestState = isRegistering ? registerState : loginState;

  const changeMode = () => {
    setMode((current) => current === "login" ? "register" : "login");
    setValidationError("");
    loginState.reset();
    registerState.reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (isRegistering && password !== formData.get("confirmPassword")) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      if (isRegistering) {
        await register({ name: formData.get("name"), email, password, referralCode: referralCode || undefined }).unwrap();
      } else {
        await login({ email, password }).unwrap();
      }
      navigate(location.state?.from || "/", { replace: true });
    } catch {
      // RTK Query exposes the backend message through requestState.error.
    }
  };

  const errorMessage = validationError
    || oauthError
    || requestState.error?.data?.message
    || (requestState.error ? `Unable to ${isRegistering ? "create your account" : "login"}. Please try again.` : "");

  return (
    <div className={styles.formSide}>
      <form onSubmit={handleSubmit}>
        <h1>{isRegistering ? "Create Account" : "Welcome Back"}</h1>
        <p>{isRegistering ? (referralCode ? `Sign up with referral code ${referralCode}` : "Sign up for your Shopora account") : "Login to your Shopora account"}</p>
        {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}

        {isRegistering && (
          <label>
            Full Name
            <input
              className={styles.textInput}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              required
            />
          </label>
        )}

        <label>
          Email Address
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address"
            required
          />
        </label>
        <label>
          Password
          <span className={styles.password}>
            <input
              type="password"
              name="password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              placeholder="Enter your password"
              minLength="8"
              required
            />
            <i>◉</i>
          </span>
        </label>

        {isRegistering && (
          <label>
            Confirm Password
            <span className={styles.password}>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Confirm your password"
                minLength="8"
                required
              />
            </span>
          </label>
        )}

        {!isRegistering && (
          <div className={styles.remember}>
            <label><input defaultChecked type="checkbox" /> Remember me</label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        )}

        <button className={styles.login} disabled={requestState.isLoading} type="submit">
          {requestState.isLoading
            ? (isRegistering ? "Creating account…" : "Logging in…")
            : (isRegistering ? "Sign Up" : "Login")}
        </button>

        {!isRegistering && (
          <>
            <div className={styles.or}>or continue with</div>
            <div className={styles.social}>
              {socialProviders.map(([icon, name]) => (
                name === "Google"
                  ? <a className={styles.google} href={buildGoogleOAuthUrl(apiBaseUrl)} key={name} onClick={() => sessionStorage.setItem("oauthReturnTo", location.state?.from || "/")}>{icon} Continue with Google</a>
                  : <button disabled title={`${name} sign-in is not configured`} type="button" key={name}>{icon} {name}</button>
              ))}
            </div>
          </>
        )}

        <div className={styles.signup}>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={changeMode} type="button">
            {isRegistering ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
