import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/PostCard.module.scss";

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const readingTime = readingTimeHelper(post).replace("read", "de leitura");

  return (
    <article
      className={`${styles.postCard} ${
        !post.feature_image ? styles.noImage : ""
      }`}
    >
      {post.featured && (
        <div className={styles.featured}>
          <span>Em destaque</span>
          <FaStar />
        </div>
      )}
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
        {post.tags.length ? (
          <div className={styles.postTags}>
            {post.tags.map((tag) => (
              <Link to={`/tag/${tag.slug}/`} key={tag.name}>
                {tag.name}
              </Link>
            ))}
          </div>
        ) : null}
        <Link to={url} className={styles.postContent}>
          <h2 className="post-card-title">{post.title}</h2>
        </Link>
      </section>
      <footer className={styles.postFooter}>
        <Link
          to={`/author/${post.primary_author.slug}/`}
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
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
