import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import styles from "../styles/Author.module.scss";

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
const Author = ({ data, location, pageContext }) => {
  const author = data.ghostAuthor;
  const posts = data.allGhostPost.edges;
  const twitterUrl = author.twitter
    ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = author.facebook
    ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
    : null;

  return (
    <>
      <MetaData data={data} location={location} type="profile" />
      <Layout>
        <header
          className={styles.header}
          style={
            author.cover_image && {
              backgroundImage: `url(${author.cover_image})`,
            }
          }
        >
          <div className={styles.headerWrapper}>
            <div className={`container ${styles.content}`}>
              <div className={styles.image}>
                {author.profile_image ? (
                  <img src={author.profile_image} alt={author.name} />
                ) : (
                  <img src="/images/icons/avatar.svg" alt={author.name} />
                )}
              </div>
              <h1>{author.name}</h1>
              {author.bio && <p>{author.bio}</p>}
              <div className={styles.meta}>
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </a>
                )}
              </div>
              <span>
                {posts.length} {`estória${posts.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
        </header>
        <div className="container">
          <section className="post-feed">
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Author.propTypes = {
  data: PropTypes.shape({
    ghostAuthor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cover_image: PropTypes.string,
      profile_image: PropTypes.string,
      website: PropTypes.string,
      bio: PropTypes.string,
      location: PropTypes.string,
      facebook: PropTypes.string,
      twitter: PropTypes.string,
    }),
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Author;

export const pageQuery = graphql`
  query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...GhostAuthorFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
