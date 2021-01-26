const _ = require("lodash");
const path = require("path");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const sharp = require(`sharp`);
const glob = require(`glob`);

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
            }
          }
        }
      }
      allMdx(limit: 1000) {
        edges {
          node {
            rawBody
            body
            id
            fields {
              slug
            }
            frontmatter {
              title
              beforebody
              afterbody
              templateKey
              featuredimage {
                base
                name
              }
              sidebar {
                image {
                  base
                  name
                }
              }
              products {
                name
                image {
                  base
                  name
                }
              }
            }
          }
        }
      }
      BG: allMdx(filter: { frontmatter: { cat: { eq: "Buying Guides" } } }) {
        totalCount
      }
      LG: allMdx(filter: { frontmatter: { cat: { eq: "Learning Guides" } } }) {
        totalCount
      }
      N: allMdx(filter: { frontmatter: { cat: { eq: "News" } } }) {
        totalCount
      }
      R: allMdx(filter: { frontmatter: { cat: { eq: "Reviews" } } }) {
        totalCount
      }
      S: allMdx(filter: { frontmatter: { writer: { eq: "Atif Liaqat" } } }) {
        totalCount
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMdx.edges;
    const posts2 = result.data.allMarkdownRemark.edges;
    const allCat = [
      { name: "Buying Guides", count: result.data.BG.totalCount },
      { name: "Learning Guides", count: result.data.LG.totalCount },
      { name: "News", count: result.data.N.totalCount },
      { name: "Reviews", count: result.data.R.totalCount },
      { name: "Sample Person", count: result.data.S.totalCount },
    ];
    const postsPerPage = 6;

    const createNplace = async (match, type, options, mobile = false) => {
      const stream = sharp(match);
      const name = match.split("/").filter(Boolean).pop();
      const lastDot = name.lastIndexOf(".");
      const fileName = name.substring(0, lastDot);
      const path = "./static/image";
      const newPath = mobile ? `${path}/${type}/${fileName}-m.webp` : `${path}/${type}/${fileName}.webp`;
      await stream.resize(options).webp({ quality: 100 }).toFile(newPath);
    };

    const createp = (posts) => {
      posts.forEach((edge) => {
        const id = edge.node.id;
        const title = edge.node.frontmatter.title;
        const slug = edge.node.fields.slug;
        const tempKey = edge.node.frontmatter.templateKey;

        if (tempKey === "category-page" || tempKey === "author-page") {
          let numPages = 0;
          allCat.forEach(({ name, count }) => {
            if (name === title) {
              numPages = count;
            }
          });

          numPages = numPages ? Math.ceil(numPages / postsPerPage) : 1;
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `${slug}/` : `${slug}/page/${i + 1}/`,
              component: path.resolve(`./src/templates/${tempKey}.js`),
              context: {
                id,
                slug: slug,
                cat: title,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
              },
            });
          });
        } else {
          if (tempKey === "blog-post") {
            const match = `./static/img/${edge.node.frontmatter.featuredimage.base}`;
            const oldImage = glob.sync(`./static/image/category/${edge.node.frontmatter.featuredimage.name}.webp`);
            if (!oldImage.length) {
              createNplace(match, "category", { width: 348 });
              createNplace(match, "front-first", { width: 675 });
              createNplace(match, "front-right", { width: 195 });
              createNplace(match, "latest", { width: 385 });
              createNplace(match, "post-first", { width: 868 });
              createNplace(match, "post-first", { width: 450 }, true);
              createNplace(match, "post-latest", { width: 230 });
            }

            const sidebar = edge.node.frontmatter.sidebar;
            if (sidebar !== null && sidebar.image !== null) {
              const match = `./static/img/${sidebar.image.base}`;
              const oldImage = glob.sync(`./static/image/sidebar/${sidebar.image.name}.webp`);
              !oldImage.length && createNplace(match, "sidebar", { width: 230, height: 150, fit: "inside" });
            }

            const products = edge.node.frontmatter.products;
            if (products !== null) {
              products.map((item) => {
                if (item.image !== null) {
                  const match = `./static/img/${item.image.base}`;
                  let oldImage = glob.sync(`./static/image/post/${item.image.name}.webp`);
                  if (!oldImage.length) {
                    const stream = sharp(match);
                    const info = stream.metadata();
                    if (info.width < 800) {
                      createNplace(match, "post", { width: info.width, fit: "inside" });
                    } else {
                      createNplace(match, "post", { width: 800, fit: "inside" });
                    }
                    createNplace(match, "table", { width: 110 });
                    createNplace(match, "table", { width: 220 }, true);
                  }
                }
              });
            }

            let m;
            let str = edge.node.rawBody;
            str = str.split("\\").join("");
            str1 = edge.node.frontmatter.beforebody + edge.node.body;
            str2 = edge.node.frontmatter.afterbody;

            const tocData = [];
            const tocRex1 = /(mdx\(PTitle, ({[^}]*}))/g;
            const tocRex2 = /(title: "([^"]*)")/g;
            const tocRex3 = /(hlevel: "([^"]*)")/g;
            while ((m = tocRex1.exec(str1))) {
              let title;
              let heading;
              const newStr = m[2].split("\n").join("").split('"').join('"').split("  ").join("");
              while ((me = tocRex2.exec(newStr))) {
                title = me[2];
              }
              while ((me = tocRex3.exec(newStr))) {
                heading = me[2];
              }
              tocData.push({
                title,
                heading: heading || "2",
                id:
                  title &&
                  title
                    .replace(/[^\w ]/, "")
                    .split(" ")
                    .join("_"),
              });
            }

            if (products !== null) {
              products.forEach((item) => {
                tocData.push({
                  title: item.name,
                  heading: "3",
                  id: item.name
                    .replace(/[^\w ]/, "")
                    .split(" ")
                    .join("_"),
                });
              });
            }

            while ((m = tocRex1.exec(str2))) {
              let title;
              let heading;
              const newStr = m[2].split("\n").join("").split('"').join('"').split("  ").join("");
              while ((me = tocRex2.exec(newStr))) {
                title = me[2];
              }
              while ((me = tocRex3.exec(newStr))) {
                heading = me[2];
              }
              tocData.push({
                title,
                heading: heading || "2",
                id:
                  title &&
                  title
                    .replace(/[^\w ]/, "")
                    .split(" ")
                    .join("_"),
              });
            }

            createPage({
              path: slug == "/index" ? "/" : `${slug}/`,
              component: path.resolve(`src/templates/${tempKey}.js`),
              // additional data can be passed via context
              context: {
                id,
                toc: tocData,
              },
            });
          } else {
            createPage({
              path: slug == "/index" ? "/" : `${slug}/`,
              component: path.resolve(`src/templates/${tempKey}.js`),
              // additional data can be passed via context
              context: {
                id,
              },
            });
          }
        }
      });
    };

    createp(posts);
    createp(posts2);
  });
};

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      beforebody: String @mdx
      afterbody: String @mdx
    }
  `);
};
