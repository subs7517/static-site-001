import React from "react";
import Star from "../../svg-icons/star.js";

const RatingBox = ({ count, value }) => {
  const pingPong = () => {
    const ratingStars = [];
    let isChecked = false;
    let i = 0;
    while (i <= 5) {
      if (!isChecked) {
        if (!count && !i) {
          isChecked = true;
        } else if (count && i + 0.2 >= value) {
          isChecked = true;
        }
      }
      ratingStars.push(
        <React.Fragment key={i}>
          <label aria-label={`${i} stars`} className={`rating__label ${(i.toString().indexOf(".") > -1 && "rating__label--half") || ""}`} htmlFor={`rating2-${i.toFixed(1).replace(".", "")}`}>
            {!!i && <Star />}
          </label>
          <input className={`rating__input ${(!i && "rating__input--none") || ""}`} defaultChecked={isChecked} id={`rating2-${i.toFixed(1).replace(".", "")}`} value={i} type="radio" />
        </React.Fragment>
      );
      i = i + 0.5;
    }

    return ratingStars;
  };

  return (
    <div className="rating-box">
      <div className="rating-group">{pingPong()}</div>
      <p className="rating-total">
        {count ? value.toFixed(1) : "0.0"} ({count})
      </p>
    </div>
  );
};

export default RatingBox;
