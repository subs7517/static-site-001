import React, { useState } from "react";

const SidebarTableofContents = ({ data }) => {
  const [bSidebar, setBSidebar] = useState("");
  const sideShow = data && data.stoc && data.image && data.stoc.length !== 0 ? true : false;
  const { stoc: sToC, alink: sLink, atext: sText, stitle: sTitle2 } = sideShow && data;
  const { base: sImg, name: sImgName } = sideShow && data.image;
  const { width, height } = sideShow && data.image.childImageSharp.original;

  const openSidebar = () => {
    bSidebar ? setBSidebar("") : setBSidebar("active");
  };

  return (
    sideShow && (
      <>
        <button className={`sidebar-btn ${bSidebar}`} onClick={() => openSidebar()}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id="toc-sidebar" className="toc-sidebar" role="navigation">
          <div className="toc-top">
            <p className="toctitle">Table of Contents</p>
            <ul>
              {sToC.map((item, index) => {
                const id = `#${item.name
                  .replace(/[^\w ]/, "")
                  .split(" ")
                  .join("_")}`;
                const { name, level } = item;

                return (
                  <li className={`toclevel-${level ? 2 : 1}`} key={index}>
                    <a onClick={() => setBSidebar("")} href={id} title={name}>
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="toc-bottom">
            <p className="toc-bottom-heading">{sTitle2}</p>
            <a href={sLink} rel="nofollow noopener noreferrer" target="_blank">
              <picture>
                <source srcSet={`/image/sidebar/${sImgName}.webp`} />
                <img src={`/img/${sImg}`} alt={sText} loading="lazy" width={width} height={height} />
              </picture>
              <p>{sText}</p>
            </a>
          </div>
        </div>
      </>
    )
  );
};

export default SidebarTableofContents;
