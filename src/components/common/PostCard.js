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
      className={`${styles.card} ${!post.feature_image ? styles.noImage : ""}`}
      style={
        post.feature_image && {
          backgroundImage: `url(${post.feature_image})`,
        }
      }
    >
      <div className={styles.cardWrapper}>
        {post.featured && (
          <div className={styles.featured}>
            <span>Em destaque</span>
            <FaStar />
          </div>
        )}
        <section className={styles.body}>
          {post.tags.length ? (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Link to={`/tag/${tag.slug}/`} key={tag.name}>
                  {tag.name}
                </Link>
              ))}
            </div>
          ) : null}
          <Link to={url} className={styles.content}>
            <h2 className="post-card-title">{post.title}</h2>
          </Link>
        </section>
        <footer className={styles.footer}>
          <Link
            to={`/author/${post.primary_author.slug}/`}
            className={styles.footerLeft}
          >
            <div className={styles.avatar}>
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
          <div className={styles.footerRight}>
            <div>{readingTime}</div>
          </div>
        </footer>
      </div>
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
