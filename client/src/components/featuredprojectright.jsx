import React from "react";
import "../../src/font.css";
import "./featuredprojectright.css";

import { Link } from "react-router-dom";

export default function FeaturedProjectRight({ title, short_description, image_url, case_url }) {
  return (
    <section className="featuredProject">
      <div className="featuredInner">
        <div className="featuredText">
          <h3>{title}</h3>
          <p>{short_description}</p>
        </div>
        <div className="featuredImageWrapper">
          <Link to={case_url}>
            <img src={image_url} alt={title} />
          </Link>
        </div>
      </div>
    </section>
  );
}
