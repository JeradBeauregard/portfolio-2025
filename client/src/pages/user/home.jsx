import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Hero from "../../components/hero";
import FeaturedWorkBanner from "../../components/featuredworkbanner";
import FeaturedProjectRight from "../../components/featuredprojectright";
import Footer from "../../components/footer";

import "../../../src/font.css";
import "./home.css";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${baseUrl}/api/casestudies/getallcases`);
        const data = await response.json();
        const featured = data.filter(
          (project) => project.featured === true || project.featured === "true"
        );
        setFeaturedProjects(featured);
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="featuredSection">
          {/* Decorative decals */}
          <div className="featuredDecals decalTopLeft" />
          <div className="featuredDecals decalBottomRight" />
          <div className="featuredDecals decalZigzag" />
          <div className="featuredDecals decalBolt" />
          <div className="featuredDecals decalStripe" />

          <FeaturedWorkBanner />

          <div className="featuredProjectsWrapper">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <FeaturedProjectRight
                  key={project._id}
                  title={project.title}
                  short_description={project.short_description}
                  image_url={project.thumbnail_url}
                  case_url={project.case_link}
                />
              ))
            ) : (
              <p className="noProjectsText">No featured projects found.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
