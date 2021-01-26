import React from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const HeadData = (props) => {
  const { siteURL, title: siteName } = useSiteMetadata();
  const { title, description, image, schema } = props;
  const sitemapschema = `{
    "@context":"https://schema.org",
    "@graph":[
      {"@context":"https://schema.org","@type":"SiteNavigationElement","@id":"#Primary","name":"Learning Guides","url":"${siteURL}/learning-guides/"},
      {"@context":"https://schema.org","@type":"SiteNavigationElement","@id":"#Primary","name":"Buying Guides","url":"${siteURL}/buying-guides/"},
      {"@context":"https://schema.org","@type":"SiteNavigationElement","@id":"#Primary","name":"News","url":"${siteURL}/news/"},
      {"@context":"https://schema.org","@type":"SiteNavigationElement","@id":"#Primary","name":"Reviews","url":"${siteURL}/reviews/"}]}`;
  const index = props.index !== false;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#fff" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${siteURL}/${`img/${image}` || "useful-img/logo-large.png"}`} />
      <meta name="twitter:card" content="" />
      <meta name="twitter:creator" content="" />
      <meta name="twitter:site" content="" />
      <link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-32x32.jpg`} sizes="32x32" />
      <link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-16x16.jpg`} sizes="16x16" />
      <script type="application/ld+json">{sitemapschema}</script>
      {index ? <meta name="robots" content="index, follow" /> : <meta name="robots" content="noindex" />}
      {index && <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      {index && <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      {schema && <script type="application/ld+json">{schema}</script>}
      {props.children}
    </Helmet>
  );
};

export default HeadData;
