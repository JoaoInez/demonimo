import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  const allPosts = data.allGhostPost.edges;
  const featuredPost =
    pageContext.pageNumber === 0
      ? allPosts.find(({ node }) => node.featured)
      : null;
  const posts = featuredPost
    ? allPosts.filter((post) => post.node.id !== featuredPost.node.id)
    : allPosts;

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {/* The tag below includes the markup for each post - components/common/PostCard.js */}
            {featuredPost && (
              <PostCard
                key={featuredPost.node.id}
                post={featuredPost.node}
                featured={true}
              />
            )}
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
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
