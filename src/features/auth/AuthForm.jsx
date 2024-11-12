import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";
import toastr from "toastr";

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
      toastr.options.extendedTimeOut = 0;
      toastr.options.positionClass = "toast-bottom-right";
      toastr.success(`${authAction} successful!`);
      navigate("/");
    } catch (error) {
      console.error(error);

      if (isLogin && loginError) {
        toastr.error(`${JSON.stringify(loginError.data)}`);
        toastr.options.extendedTimeOut = 30;
      } else if (!isLogin && registerError) {
        toastr.error(`${JSON.stringify(registerError.data.error)}`);
        toastr.options.extendedTimeOut = 30;
      }
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
                  aria-label="username-input"
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
                  aria-label="password-input"
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
    </>
  );
}

export default AuthForm;
