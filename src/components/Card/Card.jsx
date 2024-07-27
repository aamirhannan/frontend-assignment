import React from "react";
import "./card.css";

const Card = () => {
  return (
    <div className="card-container">
      <img className="card-img" src="../public/card-img.png" alt="" />
      <h1 className="card-title">Title </h1>
      <p className="card-description">description</p>
      <div className="creation-information">
        <div className="date-info"></div>
        <div className="location-info"></div>
        <div className="price-info"></div>
      </div>
    </div>
  );
};

export default Card;
