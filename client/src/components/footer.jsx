import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="footer-container">
      <div id="footer-inner-container">
        <button id="hire-btn" type="button" aria-label="Hire Me">
          Hire Me
        </button>
        <div id="container-bottom">
          <nav aria-label="Footer navigation">
            <ul id="nav-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
