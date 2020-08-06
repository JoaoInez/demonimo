import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";
import styles from "../../styles/PostCard.module.scss";

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const readingTime = readingTimeHelper(post);
  console.log(post);

  return (
    <article
      className={`${styles.postCard} ${
        !post.feature_image ? styles.noImage : ""
      }`}
    >
      {post.feature_image && (
        <header
          className={styles.postHeader}
          style={{
            backgroundImage: `url(${post.feature_image})`,
          }}
        >
          <Link to={url} />
        </header>
      )}
      <section className={styles.postBody}>
        {post.tags.length
          ? post.tags.map((tag) => (
              <Link to={`/tag/${tag.slug}/`} key={tag.name}>
                {tag.name}
              </Link>
            ))
          : null}
        <Link to={url} className={styles.postContent}>
          {post.featured && <span>Featured</span>}
          <h2 className="post-card-title">{post.title}</h2>
          {post.excerpt}
        </Link>
      </section>
      <footer className={styles.postFooter}>
        <Link
          to={`/author/${post.authors[0].slug}/`}
          className={styles.postFooterLeft}
        >
          <div className={styles.postAvatar}>
            {post.primary_author.profile_image ? (
              <img
                className={styles.authorImage}
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
              />
            ) : (
              <img
                src="/images/icons/avatar.svg"
                alt={post.primary_author.name}
              />
            )}
          </div>
          <span>{post.primary_author.name}</span>
        </Link>
        <div className={styles.postFooterRight}>
          <div>{readingTime}</div>
        </div>
      </footer>
    </article>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    // tags: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     name: PropTypes.string,
    //   })
    // ),
    tags: PropTypes.any,
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
    authors: PropTypes.any,
  }).isRequired,
};

export default PostCard;
