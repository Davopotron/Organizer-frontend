import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const attemptLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <menu>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/MyList">My Lists</NavLink>
        </li>
        <li>
          <NavLink to="#">Near Me</NavLink>
        </li>
        <li>
          <NavLink to="#">Shopping</NavLink>
        </li>
        {token ? (
          <>
            <li>
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
