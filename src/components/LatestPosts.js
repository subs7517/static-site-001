import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const LatestPosts = (props) => {
  const lp = useStaticQuery(graphql`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 3) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
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
    }
  `);

  const { nodes: posts } = lp.allMdx;

  const FillSpace = (catLength) => {
    const space = [];
    for (var i = 3; i > catLength; i--) {
      space.push(<div className="index-column" key={i}></div>);
    }
    return space;
  };

  return (
    <div className="cat-section latest-posts">
      <p className="lp-title">Latest Posts</p>
      <div className="index-columns">
        {posts.map((post) => {
          const id = post.id;
          const slug = post.fields.slug;
          const { title, cat: category } = post.frontmatter;
          const { name: imgName, base: img } = post.frontmatter.featuredimage;
          const { width, height } = post.frontmatter.featuredimage.childImageSharp.original;

          return (
            <div className="index-column" key={id}>
              <div className="index-col-image">
                <Link to={`${slug}/`}>
                  <picture>
                    <source srcSet={`/image/latest/${imgName}.webp`} />
                    <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
                  </picture>
                </Link>
              </div>
              <div className="index-box-cat">
                <Link to={`/${category.toLowerCase().split(" ").join("-")}/`}>{category}</Link>
              </div>
              <div className="index-box-title">
                <Link to={`${slug}/`}>{title}</Link>
              </div>
            </div>
          );
        })}
        {FillSpace(posts.length)}
      </div>
    </div>
  );
};

export default LatestPosts;
