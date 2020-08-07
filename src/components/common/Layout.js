import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";
import styles from "../../styles/Layout.module.scss";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const site = data.allGhostSettings.edges[0].node;
  const twitterUrl = site.twitter
    ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = site.facebook
    ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
    : null;

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>
      <div className="viewport">
        <div className="viewport-top">
          <nav className={styles.navbar}>
            <div className="container">
              {/* The navigation items as setup in Ghost */}
              <Navigation data={site.navigation} navClass={styles.navbarItem} />
            </div>
          </nav>
          {/* The main header section on top of the screen */}
          <header
            className="site-head"
            style={{
              ...(site.cover_image && {
                backgroundImage: `url(${site.cover_image})`,
              }),
            }}
          >
            <div className="container">
              {isHome ? (
                <div className="site-banner">
                  <h1 className="site-banner-title">{site.title}</h1>
                  <p className="site-banner-desc">{site.description}</p>
                </div>
              ) : null}
            </div>
          </header>

          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>
        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className={styles.footer}>
            <div className="container">
              <div>
                <Navigation
                  data={site.navigation}
                  navClass="site-foot-nav-item"
                />
              </div>
              <div>
                {site.twitter && (
                  <a
                    href={twitterUrl}
                    className="site-nav-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}
                {site.facebook && (
                  <a
                    href={facebookUrl}
                    className="site-nav-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </a>
                )}
              </div>
              <div>
                <Link to="/">{site.title}</Link> © 2020 &mdash; Published with{" "}
                <a
                  className="site-foot-nav-item"
                  href="https://ghost.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ghost
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        file(relativePath: { eq: "ghost-icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
