import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import styles from "../styles/Autores.module.scss";

const Autores = ({ data, location }) => {
  const authors = data.allGhostAuthor.edges;

  return (
    <>
      <MetaData location={location} />
      <Layout bodyClass={styles.main}>
        <section className={styles.content}>
          <div className="container">
            <h1 className="content-title">Autores</h1>
          </div>
          <article className={styles.grid}>
            {authors.map(({ node }) => (
              <Link
                to={`/author/${node.slug}`}
                key={node.id}
                className={styles.author}
              >
                <img src={node.profile_image} alt={node.name} />
                <p>{node.name}</p>
              </Link>
            ))}
          </article>
        </section>
      </Layout>
    </>
  );
};

// TODO
Autores.propTypes = {};

export default Autores;

// TODO: make a fragment for this
export const pageQuery = graphql`
  query GhostAuthorsQuery {
    allGhostAuthor(
      filter: { slug: { ne: "data-schema-author" }, postCount: { gt: 0 } }
    ) {
      edges {
        node {
          id
          name
          slug
          profile_image
        }
      }
    }
  }
`;
