import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogInfo from "../components/blog/BlogInfo.js";
import HeadData from "../components/HeadData.js";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import * as PostComps from "../components/blog/PostComponents.js";
import Writer from "../components/Writer.js";
import LatestPosts from "../components/LatestPosts.js";
import RatingBox from "../components/blog/RatingBox";
import TopArrow from "../svg-icons/top-arrow.js";
import { Disqus } from "gatsby-plugin-disqus";
import LazyLoad from "react-lazy-load";
import useSiteMetaData from "../components/SiteMetadata.js";
import SidebarLatestPosts from "../components/sidebar/SidebarLatestPosts";
import SidebarTableofContents from "../components/sidebar/SidebarTableofContents";
import Search from "../components/SearchForm";

export const BlogPostTemplate = (props) => {
  const { content, title, helmet, date, image, sidebar, faq, writer, rating, rcount, rvalue, tableofcontent, link, tocdata, beforeBody, afterBody, products, productstabletitle, productstable } = props;
  const [btT, setBtT] = useState("");
  const contentRef = useRef(null);
  const [topOffset, setTopOffset] = useState(900000000);
  const { base: img, name: imgName } = image;
  const { width, height } = image.childImageSharp.original;
  const disqusConfig = {
    url: link,
  };

  const scrollTop = () => {
    typeof window !== "undefined" &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  const backToTop = () => {
    window.scrollY > 300 ? setBtT("active") : setBtT("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", backToTop);

      setTopOffset(contentRef.current.offsetTop + contentRef.current.offsetHeight - 1000);

      return () => window.removeEventListener("scroll", backToTop);
    }
  }, [tableofcontent]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ea = document.querySelectorAll("a[href^='#']");
      const r = (e) => {
        e.preventDefault();
        const o = e.target.getAttribute("href").substring(1);
        if (document.getElementById(o)) {
          const e = window.scrollY + document.getElementById(o).getBoundingClientRect().top - 20;
          window.scrollTo({ top: e, behavior: "smooth" });
        }
      };
      for (const t of ea) {
        t.addEventListener("click", r);
      }
      return () => {
        for (const t of ea) {
          t.removeEventListener("click", r);
        }
      };
    }
  }, []);

  return (
    <section className="section blog-post">
      {helmet}
      <button onClick={() => scrollTop()} className={`btp ${btT}`}>
        <TopArrow />
      </button>
      <div className="container content">
        <div className="blog-columns">
          <div className="column is-9">
            <div className="blog-section-top">
              <picture className="blog-top-img">
                <source media="(min-width:768px)" srcSet={`/image/post-first/${imgName}.webp`} />
                <source media="(min-width:100px)" srcSet={`/image/post-first/${imgName}-m.webp`} />
                <img src={`/img/${img}`} alt={title} loading="lazy" width={width} height={height} />
              </picture>
              <div className="blog-section-top-inner">
                <h1 className="title">{title}</h1>
                <BlogInfo date={date} disqusConfig={disqusConfig} title={title} image={img} />
                <MDXProvider components={PostComps}>
                  <MDXRenderer>{beforeBody}</MDXRenderer>
                </MDXProvider>
              </div>
            </div>
            {tableofcontent && <PostComps.TableOfContents data={tocdata} />}
            {productstable && !!products?.length && <PostComps.PTitle title={productstabletitle} cName="is-bold is-center" />}
            {productstable && !!products?.length && <PostComps.ProductsTable products={products} />}
            <div ref={contentRef} className="post-content">
              <div className="post-text">
                <MDXProvider components={PostComps}>
                  <MDXRenderer>{content}</MDXRenderer>
                </MDXProvider>
              </div>
              {products?.map((item, index) => (
                <div className="product-box" key={index}>
                  <PostComps.PTitle hlevel="3" title={item.name} />
                  <PostComps.PImage alt={item.name} src={item.image?.base} />
                  <PostComps.SpecTable spec={item.specs} />
                  {item.body}
                  <PostComps.ProsNCons pros={item.pros} cons={item.cons} />
                  <PostComps.BButton link={item.link} />
                </div>
              ))}
            </div>
            <div className="blog-section-bottom">
              <MDXProvider components={PostComps}>
                <MDXRenderer>{afterBody}</MDXRenderer>
              </MDXProvider>
            </div>
            {faq && (
              <div className="post-faq">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                {faq.map((item, index) => (
                  <div className="faq-question" key={index}>
                    <h3 className="faq-ques">{item.ques}</h3>
                    <p className="faq-ans">{item.ans}</p>
                  </div>
                ))}
              </div>
            )}
            {rating && <RatingBox count={rcount} value={rvalue} />}
            <Writer writer={writer} />
            <div id="disqus_thread">
              <LazyLoad offsetTop={topOffset}>
                <Disqus config={disqusConfig} />
              </LazyLoad>
            </div>
          </div>
          <div className="column is-3">
            <div className="sidebar">
              <div className="site-info">
                <p>sitetitle is reader-supported. When you buy through links on our site, we may earn an affiliate commission.</p>
              </div>
              <Search />
              <SidebarLatestPosts />
              <SidebarTableofContents data={sidebar} />
            </div>
          </div>
        </div>
        <LatestPosts />
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  helmet: PropTypes.object,
  date: PropTypes.string,
  image: PropTypes.object,
  sidebar: PropTypes.object,
  faq: PropTypes.array,
  writer: PropTypes.string,
  enabletoc: PropTypes.bool,
  cat: PropTypes.string,
};

const BlogPost = (props) => {
  const { mdx: post } = props.data;
  const { title, date, sdate, moddate, writer, rcount, faq, products, seoTitle, seoDescription, cat, featuredimage, sidebar, rating, tableofcontent, rvalue, beforebody, afterbody, productstable, productstabletitle } = post.frontmatter;
  const { base: img } = post.frontmatter.featuredimage;
  const { siteURL, title: siteName } = useSiteMetaData();
  const path = `${siteURL}/${post.frontmatter.slug}/`;

  const articleSchema = `{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${path}"
    },
    "headline": "${title}",
    "image": [
      "${siteURL}/img/${img}"
     ],
    "datePublished": "${sdate}",
    "dateModified": "${moddate}",
    "author": {
      "@type": "Person",
      "name": "${writer}"
    },
     "publisher": {
      "@type": "Organization",
      "name": "${siteName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${siteURL}/useful-img/logo-large.png"
      }
    }
  }`;

  const ratingSchema = `{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "${title}",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "${rcount}",
      "bestRating": "5",
      "worstRating": "1"
    }
  }`;

  const faqSchema = `{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${
        faq &&
        faq.map(
          (item) => `{
          "@type": "Question",
          "name": "${item.ques}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${item.ans}" 
          }
        }`
        )
      }
    ]
  }`;

  const productSchema = `{
    "@context": "http://schema.org",
    "@type": "ItemList",
    "url": "${path}",
    "name": "${title}",
    "itemListElement": [
      ${
        products &&
        products.map(
          (item, index) => `{
        "@type":"ListItem",
        "position":${index + 1},
        "url":"${path}#${item.name
            .replace(/[^\w ]/, "")
            .split(" ")
            .join("_")}",
        "@id":"#${item.name
          .replace(/[^\w ]/, "")
          .split(" ")
          .join("_")}",
        "name":"${item.name}"
      }`
        )
      }
    ]
  }`;

  return (
    <Layout type="post" title={title} titleParent={cat} link={`/${cat.toLowerCase().split(" ").join("-")}/`}>
      <BlogPostTemplate
        content={post.body}
        helmet={
          <HeadData title={seoTitle} description={seoDescription} image={img}>
            <script type="application/ld+json">{articleSchema}</script>
            {rating && <script type="application/ld+json">{ratingSchema}</script>}
            {products && <script type="application/ld+json">{productSchema}</script>}
            {faq && <script type="application/ld+json">{faqSchema}</script>}
          </HeadData>
        }
        cat={cat}
        title={title}
        date={date}
        image={featuredimage}
        sidebar={sidebar}
        faq={faq}
        writer={writer}
        rvalue={rvalue ? rvalue : 5}
        rcount={rcount || 0}
        rating={rating}
        tableofcontent={tableofcontent}
        link={path}
        tocdata={props.pageContext.toc}
        beforeBody={beforebody}
        afterBody={afterbody}
        products={products}
        productstabletitle={productstabletitle}
        productstable={productstable}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        slug
        seoTitle
        seoDescription
        featuredimage {
          base
          name
          childImageSharp {
            original {
              height
              width
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        sdate: date(formatString: "YYYY-MM-DDTHHmmss")
        moddate(formatString: "YYYY-MM-DDTHHmmss")
        tableofcontent
        writer
        rating
        rcount
        rvalue
        beforebody
        productstable
        productstabletitle
        products {
          name
          link
          image {
            name
            base
            childImageSharp {
              original {
                height
                width
              }
            }
          }
          body
          pros
          cons
          specs {
            name
            value
          }
        }
        afterbody
        cat
        sidebar {
          stitle
          atext
          alink
          stoc {
            level
            name
          }
          image {
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
        faq {
          ans
          ques
        }
      }
    }
  }
`;
