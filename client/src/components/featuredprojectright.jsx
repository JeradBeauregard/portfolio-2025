import React from "react";
import "../../src/font.css";
import "./featuredprojectright.css";

export default function FeaturedProjectRight({ title, short_description, image_url }) {
  return (
    <div id="main-container">
      <div id="inner-container">
        <div id="container-left">
          <h3>{title}</h3>
          <p>{short_description}</p>
        </div>
        <div id="container-right">
          <img src={image_url} alt={title} />
        </div>
      </div>
    </div>
  );
}
