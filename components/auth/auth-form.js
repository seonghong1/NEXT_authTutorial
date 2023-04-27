import { useState, useRef } from "react";
import classes from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const email_input = useRef();
  const password_input = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function createUser(email, password) {
    const response = await fetch("/api/auth/sighup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error({ message: "response failed" });
    }
    return data;
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = email_input.current.value;
    const password = password_input.current.value;

    if (isLogin) {
    } else {
      try {
        const response = createUser(email, password);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={email_input} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={password_input} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
