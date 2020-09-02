import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { FiMenu } from "react-icons/fi";

import styles from "../../styles/Navbar.module.scss";

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 *
 */
const Navigation = ({ data, navbar = false, open, setOpen }) => {
  const [home, ...navItems] = data;

  return navbar ? (
    <nav className={styles.nav}>
      <button
        className={styles.toggleSidebar}
        onClick={() => setOpen((_open) => !_open)}
      >
        <FiMenu />
      </button>
      <Link to={home.url}>{home.label}</Link>
      <div>
        {navItems.map((navItem, i) => {
          if (navItem.url.match(/^\s?http(s?)/gi)) {
            return (
              <a
                href={navItem.url}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
              >
                {navItem.label}
              </a>
            );
          } else {
            return (
              <Link to={navItem.url} key={i} activeClassName={styles.active}>
                {navItem.label}
              </Link>
            );
          }
        })}
        <Link to="/autores">Autores</Link>
      </div>
      <div
        className={open ? `${styles.sidebar} ${styles.open}` : styles.sidebar}
      >
        <nav>
          {navItems.map((navItem, i) => {
            if (navItem.url.match(/^\s?http(s?)/gi)) {
              return (
                <a
                  href={navItem.url}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navItem.label}
                </a>
              );
            } else {
              return (
                <Link to={navItem.url} key={i} activeClassName={styles.active}>
                  {navItem.label}
                </Link>
              );
            }
          })}
          <Link to="/autores">Autores</Link>
        </nav>
        <button
          className={styles.closeArea}
          onClick={() => setOpen(false)}
        ></button>
      </div>
    </nav>
  ) : (
    <nav>
      {data.map((navItem, i) => {
        if (navItem.url.match(/^\s?http(s?)/gi)) {
          return (
            <a
              href={navItem.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          );
        } else {
          return (
            <Link to={navItem.url} key={i}>
              {navItem.label}
            </Link>
          );
        }
      })}
      <Link to="/autores">Autores</Link>
    </nav>
  );
};

Navigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  navbar: PropTypes.bool,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  instagram: PropTypes.string,
};

export default Navigation;
