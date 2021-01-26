import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const SidebarLatestPosts = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 5) {
        nodes {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);
  const { nodes: posts } = data.allMdx;

  return (
    <div className="posts-sidebar">
      <p>Latest Posts</p>
      <ul>
        {posts.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.frontmatter.slug}/`}>{item.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLatestPosts;
