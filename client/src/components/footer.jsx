import React from "react";
import "./footer.css";

export default function Footer(){
    return(
        <div id="footer-container">
            <div id="footer-inner-container">
            <button id="hire-btn">
            Hire Me
            </button>
            <div id="container-bottom">
            <nav id="nav-list">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </nav>
            </div>
            </div>
        </div>
    )
}