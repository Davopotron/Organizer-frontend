import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';
import './navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const attemptLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <nav>
      <menu>
        <div class='logo'>
          <span class='logo'>
            <a href='#'>TasteTrack</a>
          </span>
        </div>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/MyList'>My Lists</NavLink>
        </li>
        <li>
          <NavLink to='/nearMe'>Near Me</NavLink>
        </li>
        <li>
          <NavLink to='/shopping'>Shopping</NavLink>
        </li>
        {token ? (
          <>
            <li>
              <a
                href='#'
                onClick={attemptLogout}
              >
                Log Out
              </a>
            </li>
          </>
        ) : (
          <li>
            <NavLink to='/users/login'>Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}

export default Navbar;
