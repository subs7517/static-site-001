import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import HeadData from "../components/HeadData.js";
import Calendar from "../svg-icons/calendar.js";
import useSiteMetaData from "../components/SiteMetadata.js";
import Categories from "../components/fragments/IndexCategories.js";

const IndexTemplate = ({ data }) => {
  const singlePost = data.FP.nodes[0];
  const otherPosts = data.OP.nodes;
  const sections = [data.BG.nodes, data.LG.nodes, data.N.nodes, data.R.nodes];
  const { siteURL, title, description } = useSiteMetaData();
  const AllCategories = Categories();

  const websiteSchema = `{
      "@context":"https://schema.org",
      "@type":"WebSite",
      "@id":"${siteURL}/#website",
      "headline":"${title}",
      "name":"${title}",
      "description":"${description}",
      "url":"${siteURL}",
      "potentialAction":{
        "@type":"SearchAction",
        "target":"${siteURL}/?s={search_term_string}",
        "query-input":"required name=search_term_string"
      }
    }`;

  const newsMediaSchema = `{
        "@context":"https://schema.org",
        "@type":"NewsMediaOrganization",
        "@id":"${siteURL}/#Organization",
        "name":"${title}",
        "url":"${siteURL}",
        "sameAs":[
          "https://www.facebook.com/Sitetitle/",
          "https://www.instagram.com/aleemiqbalseo/",
          "https://www.youtube.com/c/Sitetitle"
        ],
        "logo":{
          "@type":"ImageObject",
          "url":"${siteURL}/useful-img/logo-large.png",
          "width":"800",
          "height":"258"
        },
        "contactPoint":{
          "@type":"ContactPoint",
          "contactType":"customer support",
          "telephone":"+92300000002",
          "url":"${siteURL}/contact-us/"
        }
    }`;

  return (
    <Layout>
      <section className="section index">
        <HeadData title={title} description={description} schema={`[${websiteSchema}, ${newsMediaSchema}]`} />
        <div className="container content">
          <div className="index-latest-title">
            <h2>Latest Posts</h2>
          </div>
          <div className="index-top-section">
            <FirstPost post={singlePost} />
            <OtherPosts posts={otherPosts} />
          </div>
          <div className="index-bottom-section">
            <Sections data={sections} />
            <div className="index-categories">
              <div className="index-latest-title">
                <h2>Categories</h2>
              </div>
              <div className="index-inner-categories">
                {AllCategories.map((item, index) => (
                  <div className="index-category" key={index}>
                    <h2>{item.name} Guides</h2>
                    <div className="category-links">
                      {item.data.map((item, index) => (
                        <div className="category-link" key={index}>
                          <Link to={item.link}>{item.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const FillSpace = (catLength) => {
  const space = [];
  for (var i = 6; i > catLength; i--) {
    space.push(<div className="index-column" key={i}></div>);
  }
  return space;
};

const FirstPost = ({ post }) => {
  const { title, cat: category, date } = post.frontmatter;
  const { name: imgName, base: img } = post.frontmatter.featuredimage;
  const { width, height } = post.frontmatter.featuredimage.childImageSharp.original;
  const slug = post.fields.slug;

  return (
    <div className="first-post">
      <div className="first-post-thumbnail">
        <Link to={`${slug}/`}>
          <picture>
            <source media="(min-width:768px)" srcSet={`/image/front-first/${imgName}.webp`} />
            <source media="(min-width:100px)" srcSet={`/image/post-first/${imgName}-m.webp`} />
            <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
          </picture>
        </Link>
      </div>
      <div className="first-post-info">
        <div className="post-info-cat">
          <Link to={`/${category.toLowerCase().split(" ").join("-")}/`}>{category}</Link>
        </div>
        <div className="post-info-title">
          <Link to={`${slug}/`}>{title}</Link>
        </div>
        <div className="post-info-date">
          <Calendar />
          {date}
        </div>
      </div>
    </div>
  );
};

const OtherPosts = ({ posts }) => (
  <div className="other-posts">
    {posts.map((post, index) => {
      const { title, cat: category } = post.frontmatter;
      const { name: imgName, base: img } = post.frontmatter.featuredimage;
      const { width, height } = post.frontmatter.featuredimage.childImageSharp.original;
      const slug = post.fields.slug;

      return (
        <div className="other-post" key={index}>
          <div className="other-post-thumbnail">
            <Link to={`${slug}/`}>
              <picture>
                <source srcSet={`/image/front-right/${imgName}.webp`} />
                <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
              </picture>
            </Link>
          </div>
          <div className="other-post-info">
            <div className="post-info-cat">
              <Link to={`/${category.toLowerCase().split(" ").join("-")}/`}>{category}</Link>
            </div>
            <div className="post-info-title">
              <Link to={`${slug}/`}>{title}</Link>
            </div>
            <div className="post-info-date">{post.frontmatter.date}</div>
          </div>
        </div>
      );
    })}
  </div>
);

const Sections = ({ data }) => {
  const catTitles = ["Buying Guides", "Learning Guides", "News", "Reviews"];

  return (
    <div className="cat-sections">
      {data.map(
        (cat, index) =>
          !!cat.length && (
            <div className="cat-section" key={index}>
              <div className="index-latest-title">
                <h2>{catTitles[index]}</h2>
              </div>
              <div className="index-columns">
                {cat.map((post, index) => {
                  const { title } = post.frontmatter;
                  const { name: imgName, base: img } = post.frontmatter.featuredimage;
                  const { width, height } = post.frontmatter.featuredimage.childImageSharp.original;
                  const slug = post.fields.slug;

                  return (
                    <div className="index-column" key={index}>
                      <div className="index-col-image">
                        <Link to={`${slug}/`}>
                          <picture>
                            <source srcSet={`/image/latest/${imgName}.webp`} />
                            <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
                          </picture>
                        </Link>
                      </div>
                      <div className="index-box-title">
                        <Link to={`${slug}/`}>{title}</Link>
                      </div>
                    </div>
                  );
                })}
                {FillSpace(cat.length)}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export const IndexQuery = graphql`
  query IndexQuery {
    FP: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(fromNow: true)
          cat
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
    OP: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 3, skip: 1) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          cat
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
    BG: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { cat: { eq: "Buying Guides" } } }, limit: 6) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
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
    LG: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { cat: { eq: "Learning Guides" } } }, limit: 6) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
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
    N: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { cat: { eq: "News" } } }, limit: 6) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
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
    R: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { cat: { eq: "Reviews" } } }, limit: 6) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
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
`;

export default IndexTemplate;
