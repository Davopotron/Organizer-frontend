import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";
import toastr from "toastr";
import "../toasts";

/** AuthForm allows a user to either login or register for an account. */
function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };
    console.log(isLogin);

    try {
      await authMethod(credentials).unwrap();
      toastr.success(`${authAction} successful!`);
      navigate("/");
    } catch (error) {
      console.error(error);

      if (isLogin && loginError) {
        toastr.error(`${JSON.stringify(loginError.data)}`);
        // console.log(
        //   `This is the login error: ${JSON.stringify(loginError, null, 2)}`
        // );
      } else if (!isLogin && registerError) {
        toastr.error(registerError.message, "error");
      }
    }
  };

  const showToast = (message, type) => {
    switch (type) {
      case "error":
        toastr.error(message);
        break;
      case "info":
        toastr.info(message);
        break;
      case "success":
        toastr.success(message);
        break;
      case "warning":
        toastr.warning(message);
        break;
      default:
        toastr.info(message);
    }
  };

  return (
    <>
      <div className="authContainer">
        <div className="auth">
          <h1>{authAction}</h1>
          <form onSubmit={attemptAuth}>
            <div className="usernameContainer">
              <label className="username">
                Username
                <input
                  name="username"
                  value={username}
                  className="usernameText"
                  onChange={(evt) => setUsername(evt.target.value)}
                />
              </label>
            </div>
            <div className="passwordContainer">
              <label className="password">
                Password
                <input
                  name="password"
                  type="password"
                  className="passwordText"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </label>
            </div>
            <button className="loginButton">{authAction}</button>
          </form>
          <a
            href="#"
            className="loginNote"
            onClick={() => setIsLogin(!isLogin)}
          >
            {altCopy}
          </a>
        </div>
      </div>
      {/* {isLogin && loginError && (
        <div id="toast-container-login" role="alert">
          {loginError.message}
          {showToast(loginError.message, "error")}
        </div>
      )}
      {!isLogin && registerError && (
        <div id="toast-container-register" role="alert">
          {registerError.message}
          {showToast(registerError.message, "error")}
        </div>
      )} */}
    </>
  );
}

export default AuthForm;
