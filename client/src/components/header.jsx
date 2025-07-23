import React, { useState } from "react";
import "./header.css";
import "../../src/font.css";

export default function Header() {
  const [hovering, setHovering] = useState(false);

  return (
   <header className="main-header">
  <nav className="nav-container">
    <div className="nav-logo">
      <a href="/" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        Jerad
      </a>
    </div>
    <ul className="nav-links">
      <li>
        <a href="/" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          Home
        </a>
      </li>
      <li>
        <a href="/about" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          About
        </a>
      </li>
      <li>
        <a href="/contact" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          Contact
        </a>
      </li>
    </ul>
  </nav>

  <div id="nav-horizontal-center" className={hovering ? "highlighted" : ""}></div>
  <div id="nav-horizontal-bottom"></div>
</header>

  );
}
