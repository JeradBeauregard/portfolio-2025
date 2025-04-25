import React from "react";
import "../../src/font.css";
import "./hero.css";

export default function Hero(){
    return(

        <div id="hero-container">
            <div id="hero-left">
            <h1>Hi, I'm Jerad</h1>
            <p>Like many artists I have been drawing for a long time.
                             I received formal studio training intraditional arts during my 
                             undergraduate bachelor's degree in Fine Arts. While studying Paintingand
                              Drawing I used theoretical knowledge gained through reading and writing, 
                              mixed withvigorous figurative training, to form a studio practice which 
                              works heavily with concepts oftechnology and Cyborg theory. After 
                              completion of my undergraduate degree I supplementedmy education with 
                              a Post-Graduate Certificate in Concept Art for Entertainment Design 
                              from George Brown College. During this Post-Graduate Certificate 
                              I received intense studio training in digital concept development
                             from industry professionals.</p>
            </div>
            <div id="hero-right">
                <img id="hero-image" src="/images/hero-portrait.png" alt="A portrait of me!"/>
            </div>
        </div>
    );
}