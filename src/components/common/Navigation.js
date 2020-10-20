import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Headroom from "react-headroom";
import { FiMenu } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import styles from "../../styles/Navbar.module.scss";

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 *
 */
const Navigation = ({
  data,
  navbar = false,
  open,
  setOpen,
  twitter,
  facebook,
  instagram,
}) => {
  const [home, ...navItems] = data;

  return navbar ? (
    <Headroom className={styles.headroom}>
      <nav className={styles.nav}>
        <div className={`container ${styles.container}`}>
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
                  <Link
                    to={navItem.url}
                    key={i}
                    activeClassName={styles.active}
                  >
                    {navItem.label}
                  </Link>
                );
              }
            })}
            <Link to="/autores">Autores</Link>
          </div>
          <div className={styles.socialMedia}>
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <div
            className={
              open ? `${styles.sidebar} ${styles.open}` : styles.sidebar
            }
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
                    <Link
                      to={navItem.url}
                      key={i}
                      activeClassName={styles.active}
                    >
                      {navItem.label}
                    </Link>
                  );
                }
              })}
              <Link to="/autores" activeClassName={styles.active}>
                Autores
              </Link>
              <div className={styles.socialMedia}>
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                )}
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </nav>
            <button className={styles.closeArea} onClick={() => setOpen(false)}>
              {null}
            </button>
          </div>
        </div>
      </nav>
    </Headroom>
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
