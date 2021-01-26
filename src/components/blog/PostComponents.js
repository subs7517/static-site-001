import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { useStaticQuery, graphql } from "gatsby";

export const BButton = ({ link, ctitle }) => {
  return (
    <div className="su-button-center">
      <a href={link} className="su-button" target="_blank" rel="noreferrer nofollow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
        </svg>
        <span>{ctitle || "View on Amazon"}</span>
      </a>
    </div>
  );
};

export const ProsNCons = ({ pros, cons }) => {
  return (
    <div className="su-row">
      <div className="su-column su-column-size-1-2">
        <div className="su-box-title">Pros</div>
        <div className="su-box-content su-u-clearfix su-u-trim">
          <div className="su-list">
            <ul>
              {pros
                ? pros.map((item, index) => (
                    <li key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448.8 448.8">
                        <polygon fill="currentColor" points="142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55" />
                      </svg>
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="su-column su-column-size-1-2">
        <div className="su-box-title">Cons</div>
        <div className="su-box-content su-u-clearfix su-u-trim">
          <div className="su-list">
            <ul>
              {cons
                ? cons.map((item, index) => (
                    <li key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 439.963 439.963">
                        <path fill="currentColor" d="M421.836,134.33c-11.611-27.121-27.172-50.487-46.686-70.089c-19.502-19.604-42.824-35.215-69.948-46.825   C278.088,5.806,249.674,0,219.985,0c-29.692,0-58.101,5.809-85.224,17.416c-27.124,11.61-50.441,27.218-69.949,46.825   C45.303,83.843,29.74,107.209,18.13,134.33C6.521,161.453,0.715,189.958,0.715,219.838c0,29.881,5.806,58.432,17.415,85.648   c11.613,27.223,27.172,50.627,46.682,70.236c19.508,19.605,42.825,35.217,69.949,46.818c27.123,11.615,55.531,17.422,85.224,17.422   c29.693,0,58.103-5.807,85.217-17.422c27.124-11.607,50.446-27.213,69.948-46.818c19.514-19.609,35.074-43.014,46.686-70.236   c11.611-27.217,17.412-55.768,17.412-85.648C439.244,189.958,433.447,161.453,421.836,134.33z M90.078,305.198   c-16.94-26.066-25.41-54.532-25.406-85.364c0-28.167,6.949-54.243,20.843-78.227c13.891-23.982,32.738-42.919,56.527-56.818   c23.791-13.894,49.772-20.839,77.943-20.839c31.411,0,59.952,8.661,85.652,25.981L90.078,305.198z M363.013,280.511   c-8.187,19.318-19.219,35.927-33.113,49.823c-13.9,13.895-30.409,24.982-49.539,33.254c-19.13,8.277-39.259,12.422-60.382,12.422   c-30.452,0-58.717-8.466-84.794-25.413l215.273-214.985c16.566,25.505,24.838,53.581,24.838,84.223   C375.291,240.965,371.198,261.187,363.013,280.511z" />
                      </svg>
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpecTable = ({ spec }) => {
  return (
    <table className="spec_table">
      <tbody>
        {spec &&
          spec.map((item, index) => (
            <tr key={index}>
              <td>
                <strong>{item.name} </strong>
              </td>
              <td>{item.value}</td>
            </tr>
          ))}
        <tr></tr>
      </tbody>
    </table>
  );
};

export const PTitle = ({ title, beforeTitle, afterTitle, link, hlevel, cName = "box_title", cEnable, disableTitle }) => {
  const Heading = `h${hlevel || "2"}`;
  const id = title
    .replace(/[^\w ]/, "")
    .split(" ")
    .join("_");

  return (
    <Heading id={id} className={cEnable !== false ? `${cName}` : ""}>
      {beforeTitle}
      {disableTitle === "true" ? null : link ? (
        <a href={link} target="_blank" rel="nofollow noopener noreferrer">
          {title}
        </a>
      ) : (
        title
      )}
      {afterTitle}
    </Heading>
  );
};

export const PImage = ({ alt, src, link }) => {
  const name = src.split("/").filter(Boolean).pop();
  const lastDot = name.lastIndexOf(".");
  const fileName = name.substring(0, lastDot);
  const ext = name.substring(lastDot, name.length);
  const { width, height } = useAllImages(src);
  const Anchor = link ? "a" : React.Fragment;
  const attb = link ? { href: link } : {};

  return (
    <div className="wp-block-image pimage">
      <figure className="aligncenter size-large is-resized">
        <Anchor {...attb}>
          <picture>
            {ext !== ".gif" && <source srcSet={`/image/post/${fileName}.webp`} />}
            <img src={`/img/${src}`} alt={alt} loading="lazy" width={width} height={height} />
          </picture>
        </Anchor>
      </figure>
      {link && <BButton link={link} ctitle="Check Price" />}
    </div>
  );
};

export const TImage = ({ alt, src }) => {
  const name = src.split("/").filter(Boolean).pop();
  const lastDot = name.lastIndexOf(".");
  const fileName = name.substring(0, lastDot);
  const { width, height } = useAllImages(src);

  return (
    <picture>
      <source media="(min-width:768px)" srcSet={`/image/table/${fileName}.webp`} />
      <source media="(min-width:100px)" srcSet={`/image/table/${fileName}-m.webp`} />
      <img src={`/img/${src}`} alt={alt} loading="lazy" width={width} height={height} />
    </picture>
  );
};

export const TableOfContents = ({ data }) => {
  const [height, setHeight] = useState(0);
  const [btnText, setBtnText] = useState("Show");

  const openNav = () => {
    if (height === 0) {
      setHeight("auto");
      setBtnText("Hide");
    } else {
      setHeight(0);
      setBtnText("Show");
    }
  };

  return (
    <div className="post_toc">
      <div className="post_toc_top">
        <div className="post_toc_title">Table of Contents</div>
        <button className="post_toc_btn" onClick={() => openNav()}>
          {btnText}
        </button>
      </div>
      <AnimateHeight height={height}>
        <nav>
          {data.map((item, index) => (
            <li key={index}>
              <a href={`#${item.id}`}>{item.title}</a>
            </li>
          ))}
        </nav>
      </AnimateHeight>
    </div>
  );
};

export const ProductsTable = ({ products }) => {
  return (
    <table className="tablepress table_s1">
      <thead>
        <tr className="row-1 odd">
          <th className="column-1">Moedel</th>
          <th className="column-2">&nbsp;</th>
        </tr>
      </thead>
      <tbody className="row-hover">
        {products?.map((item, index) => (
          <tr key={index}>
            <td className="column-1">
              <div className="item-detail">
                <div>
                  <TImage alt={item.name} src={item.image.base} />
                </div>
                <a
                  href={item.name
                    .replace(/[^\w ]/, "")
                    .split(" ")
                    .join("_")}
                >
                  {item.name}
                </a>
              </div>
            </td>
            <td className="column-2">
              <a href={item.link} className="su-button" target="_blank" rel="nofollow noreferrer">
                <span> Check Price</span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const InnerText = ({ children }) => {
  const [height, setHeight] = useState(280);
  const [btnDisplay, setBtnDisplay] = useState("block");
  const openReview = () => {
    setBtnDisplay("none");
    setHeight("auto");
  };

  return (
    <div className="box_text">
      <div className="box_inner_text">
        <AnimateHeight height={height}>{children}</AnimateHeight>
      </div>
      <div className="box_text_btn" style={{ display: btnDisplay }}>
        <button onClick={() => openReview()}>Read Full Review</button>
      </div>
    </div>
  );
};

export const BestProduct = ({ title, src, pros, link }) => {
  const { width, height } = useAllImages(src);

  return (
    <div className="best-product">
      <div className="best-icon">
        <img src="/useful-img/best-product.png" alt="Best Product" loading="lazy" width="90" height="90" />
      </div>
      <div className="best-rating">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </div>
      <div className="best-heading">
        <p>{title}</p>
      </div>
      <div className="best-image">
        <a href={link}>
          <img alt={title} loading="lazy" src={`/img/${src}`} width={width} height={height} />
        </a>
      </div>
      <div className="best-pros">
        {pros.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
      <div className="best-btn">
        <BButton link={link} />
      </div>
    </div>
  );
};

export const useAllImages = (src) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query AllImages {
      allImageSharp {
        nodes {
          fluid {
            originalName
            height: presentationHeight
            width: presentationWidth
          }
        }
      }
    }
  `);
  const image = allImageSharp.nodes.filter((item) => item.fluid.originalName === src)[0];
  return (image && image.fluid) || {};
};

export const YTFrame = ({ id }) => {
  return <iframe className="iframe-center" width="560" height="315" src={`https://www.youtube.com/embed/${id}`} srcdoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href="https://www.youtube.com/embed/${id}?autoplay=1"><img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" loading="lazy"><span>▶</span></a>`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="The Dark Knight Rises: What Went Wrong? – Wisecrack Edition"></iframe>;
};
