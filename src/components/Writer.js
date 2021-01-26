import React from "react";
import { Link } from "gatsby";

const Writer = ({ writer }) => {
  const writers = ["Sample Person"];
  const descriptions = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."];
  const images = ["sample-person.png"];
  const links = ["/author/sample-person/"];
  const index = writers.findIndex((_writer) => writer === _writer);

  return (
    <div className="writer">
      <Link to={links[index]} className="writer-img-link">
        <img alt={writers[index]} src={`/useful-img/${images[index]}`} className="writer-img" loading="lazy" width="100" height="100" />
      </Link>
      <div className="writer-text">
        <Link to={links[index]} className="writer-title-link">
          {writers[index]}
        </Link>
        <p>{descriptions[index]}</p>
      </div>
    </div>
  );
};

export default Writer;
