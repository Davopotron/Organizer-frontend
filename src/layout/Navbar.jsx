import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import "../css/navbar.css";
import logo from "../logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const attemptLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-left-logo">
          <img src={logo} alt="TasteTracker Logo" className="logo-image" />
        </NavLink>
      </div>
      <menu className="navbar-right">
        <li className="navbar-line">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navbar-line">
          <NavLink to="/my-lists">My Lists</NavLink>
        </li>
        <li className="navbar-line">
          <NavLink to="/near-me">Near Me</NavLink>
        </li>
        <li className="navbar-line">
          <NavLink to="/shopping">Shopping</NavLink>
        </li>
        {token ? (
          <>
            <li className="navbar-line">
              <a href="#" onClick={attemptLogout}>
                Log Out
              </a>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/users/login">Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}

export default Navbar;
