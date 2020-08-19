import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { FaFacebook, FaTwitter, FaShareAlt } from "react-icons/fa";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import config from "../utils/siteConfig";
import styles from "../styles/Post.module.scss";
import siteConfig from "../utils/siteConfig";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost;
  const url = `${config.siteUrl}/${post.slug}/`;

  const sharePost = () => {
    navigator.share({
      title: post.title,
      url,
    });
  };

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout bodyClass={styles.main}>
        {post.feature_image ? (
          <figure>
            <img
              src={post.feature_image}
              alt={post.title}
              className={styles.featureImage}
            />
          </figure>
        ) : null}
        <div className="container">
          <article className="content">
            <section className="post-full-content">
              <h1 className="content-title">{post.title}</h1>

              {/* The main post content */}
              <section
                className="content-body load-external-scripts"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>
          </article>
        </div>
        <div className={styles.shareContainer}>
          {navigator && navigator.share ? (
            <button onClick={sharePost}>
              <FaShareAlt size={20} />
            </button>
          ) : (
            <>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${post.title}&url=${url}`}
                target="blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
            </>
          )}
        </div>
        <Link
          to={`/author/${post.primary_author.slug}/`}
          className={styles.authorContainer}
        >
          <div>
            {post.primary_author.profile_image ? (
              <img
                className={styles.authorImage}
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
              />
            ) : (
              <img
                className={styles.authorImage}
                src="/images/icons/avatar.svg"
                alt={post.primary_author.name}
              />
            )}
            <div>
              <p>{post.primary_author.name}</p>
              {post.primary_author.bio && <p>{post.primary_author.bio}</p>}
            </div>
          </div>
        </Link>
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.string,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      primary_author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
        bio: PropTypes.string,
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
