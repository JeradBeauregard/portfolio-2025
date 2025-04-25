import React, { useState } from "react";
import "./header.css";
import "../../src/font.css";

export default function Header() {
  const [hovering, setHovering] = useState(false);

  return (
    <header className="main-header">
      <div id="nav-horizontal-top">
        <nav className="nav-container">
          <ul className="nav-left">
            <li>
              <a
                href="/"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Updated Jerad to be a link */}
          <div className="nav-right">
            <a
              href="/"
              className="username"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Jerad
            </a>
          </div>
        </nav>
      </div>

      {/* The center bar that changes color on hover */}
      <div
        id="nav-horizontal-center"
        className={hovering ? "highlighted" : ""}
      ></div>

      <div id="nav-horizontal-bottom"></div>
    </header>
  );
}
