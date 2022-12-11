import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../features';
import clsx from 'clsx';

import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const p = 1;

  return (
    <nav className={styles['main-menu']}>
      <ul>
        <li>
          <NavLink className={styles.logo} to="/">
            Sculpture Space
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={`/artworks/${p}`}
          >
            Discover artworks
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/canvas"
          >
            Play with canvas
          </NavLink>
        </li>
        {user && (
          <li
            className={styles['dropdown-menu']}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {user.firstName} {user.lastName}{' '}
            {isOpen && (
              <>
                <Link
                  to="/managedb"
                  className={clsx({
                    [styles.isNotAdmin]: !user.isAdmin,
                  })}
                >
                  Manage Database
                </Link>
                <Link to={`/login/edit/${user.id}`}>Manage profile</Link>
                <a
                  href="/home"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </a>
              </>
            )}
          </li>
        )}
        {!user && (
          <li className={styles.login}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/register"
            >
              {' '}
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
