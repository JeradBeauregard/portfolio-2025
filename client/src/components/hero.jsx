import React from "react";
import "../../src/font.css";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="heroInner">
        <div className="heroLeft">
          <h1>Hi, I'm Jerad.</h1>
          <p>
            I’m a developer, designer, and creative technologist building digital experiences that feel meaningful, empowering, and alive.
          </p>
          <a href="/about" className="heroButton">Learn More →</a>
        </div>
        <div className="heroRight">
          <img src="/images/hero-portrait.png" alt="A portrait of me!" />
        </div>
      </div>
    </section>
  );
}
