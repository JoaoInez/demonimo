import React from "react";
import { Link } from "gatsby";
import { Layout } from "../components/common";

const NotFoundPage = () => (
  <Layout>
    <div className="container">
      <article className="content" style={{ textAlign: `center` }}>
        <h1 className="content-title">Erro 404</h1>
        <section className="content-body">
          Pareces perdido, <Link to="/">volta para casa</Link> mas é
        </section>
      </article>
    </div>
  </Layout>
);

export default NotFoundPage;
