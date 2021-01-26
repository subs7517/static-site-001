import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import HeadData from "../components/HeadData.js";

const AuthorPage = (props) => {
  const { data } = props;
  const PageContent = HTMLContent || Content;
  const { markdownRemark: post } = data;
  const { title, seoTitle, seoDescription } = post.frontmatter;

  return (
    <Layout title={title}>
      <HeadData title={seoTitle} description={seoDescription} />
      <section className="section author-page">
        <div className="container">
          <div className="author-top">
            <PageContent className="content" content={post.html} />
          </div>
          <AuthorPosts {...props} posts={data.allMdx.edges} />
        </div>
      </section>
    </Layout>
  );
};

AuthorPage.propTypes = {
  data: PropTypes.object.isRequired,
};

const AuthorPosts = (props) => {
  const { posts } = props;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? `${props.pageContext.slug}/` : `${props.pageContext.slug}/page/${currentPage - 1}/`;
  const nextPage = `${props.pageContext.slug}/page/${currentPage + 1}/`;

  return (
    <div className="latest-posts">
      <p className="lp-title">Author Posts</p>
      <div className="category-bottom-section">
        <div className="category-columns">
          {posts &&
            posts.map(({ node: post }) => {
              const { cat: category, title, date } = post.frontmatter;
              const { name: imgName, base: img } = post.frontmatter.featuredimage;
              const { width, height } = post.frontmatter.featuredimage.childImageSharp.original;
              const slug = post.fields.slug;
              const id = post.id;

              return (
                <div className="category-column" key={id}>
                  <div className="category_box">
                    <div className="category_box_image">
                      <div className="featured-thumbnail">
                        <Link to={`${slug}/`}>
                          <picture>
                            <source srcSet={`/image/category/${imgName}.webp`} />
                            <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
                          </picture>
                        </Link>
                      </div>
                    </div>
                    <div className="category_box_title">
                      <Link to={`${slug}/`}>{title}</Link>
                    </div>
                    <div className="category_box_info">
                      <Link to={`/${category.toLowerCase().split(" ").join("-")}/`}>{category}</Link> | {date}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="pagination">
        <div className="pag-prev">
          {!isFirst && (
            <Link to={`${prevPage}`} rel="prev">
              ← Newer Posts
            </Link>
          )}
        </div>
        <div className="pag-next">
          {!isLast && (
            <Link to={`${nextPage}`} rel="next">
              Older Posts →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;

export const authorPageQuery = graphql`
  query AuthorPageByID($id: String!, $cat: String!, $skip: Int!, $limit: Int!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seoTitle
        seoDescription
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { writer: { eq: $cat } } }, limit: $limit, skip: $skip) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            cat
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              name
              base
              childImageSharp {
                original {
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
