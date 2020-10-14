import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { MdStars } from "react-icons/md";
import { BsDot } from "react-icons/bs";

import howLongSince from "../../utils/howLongSince";
import styles from "../../styles/PostCard.module.scss";

const PostCard = ({ post, featured }) => {
  const url = `/${post.slug}/`;
  const posted = howLongSince(post.published_at);

  return (
    <article
      className={`${styles.card} ${featured ? "featured" : ""}`}
      style={
        post.feature_image && {
          backgroundImage: `url(${post.feature_image})`,
        }
      }
    >
      {post.tags.length ? (
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <Fragment key={tag.name}>
              <Link to={`/tag/${tag.slug}/`}>{tag.name}</Link>
              <BsDot />
            </Fragment>
          ))}
        </div>
      ) : null}
      <Link to={url} className={styles.body}>
        {post.featured && (
          <div className={styles.featured}>
            <MdStars size="2em" />
          </div>
        )}
        <section className={styles.content}>
          <h2 className="post-card-title">{post.title}</h2>
        </section>
      </Link>
      <Link
        to={`/author/${post.primary_author.slug}/`}
        className={styles.author}
      >
        <div className={styles.avatar}>
          {post.primary_author.profile_image ? (
            <img
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
      <span className={styles.posted}>há {posted}</span>
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
    published_at: PropTypes.string.isRequired,
  }).isRequired,
  featured: PropTypes.bool,
};

export default PostCard;
