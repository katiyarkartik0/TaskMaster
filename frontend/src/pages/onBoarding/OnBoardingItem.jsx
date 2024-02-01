import React from "react";
import "./OnBoarding.css";

export const OnBoardingItem = ({ item, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <div></div>
      <img className="carousel-img" src={item.icon} />
      <div className="carousel-item-text">{item.description}
      <ul className="features">
        {item.bullets.map(({ bullet, description }) => {
          return (
            <>
              <li className="bulletName">{bullet}:</li>
              <p className="bulletDesc">{description}</p>
            </>
          );
        })}
      </ul></div>
      
    </div>
  );
};
