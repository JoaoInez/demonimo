import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Parallax } from "react-parallax";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import PostCard from "../components/common/PostCard";
import styles from "../styles/Post.module.scss";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.post;
  const url = location.href;

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        {post.codeinjection_foot && (
          <script async>
            {post.codeinjection_foot.replace(/<.*script.*>/g, "")}
          </script>
        )}
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout bodyClass={styles.main}>
        {post.feature_image ? (
          <Parallax
            bgImage={post.feature_image}
            bgImageAlt={post.title}
            strength={75}
            className={styles.parallax}
          >
            <div className={styles.featureImage} />
          </Parallax>
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
        {(data.prev || data.next) && (
          <section className={styles.hookPost}>
            <div className="container">
              <h2 className={styles.hookTitle}>Mais uma estória?</h2>
              <div className={styles.hookContainer}>
                {data.next && <PostCard post={data.next} />}
                {data.prev && <PostCard post={data.prev} />}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      codeinjection_styles: PropTypes.string,
      codeinjection_foot: PropTypes.string,
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
  prev: PropTypes.object,
  next: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!, $prev: String, $next: String) {
    post: ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
    prev: ghostPost(slug: { eq: $prev }) {
      ...GhostPostFields
    }
    next: ghostPost(slug: { eq: $next }) {
      ...GhostPostFields
    }
  }
`;
