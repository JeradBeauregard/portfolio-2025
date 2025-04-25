import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Hero from "../../components/hero";
import FeaturedWorkBanner from "../../components/featuredworkbanner";
import FeaturedProjectRight from "../../components/featuredprojectright";
import "../../../src/font.css";
import Footer from "../../components/footer";
import "./home.css";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${baseUrl}/api/casestudies/getallcases`);
        const data = await res.json();
        const featured = data.filter((project) => project.featured === true || project.featured === "true");
        setFeaturedProjects(featured);
      } catch (err) {
        console.error("Failed to fetch featured projects", err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedWorkBanner />
        
        {featuredProjects.length > 0 ? (
          featuredProjects.map((project) => (
            <FeaturedProjectRight
              key={project._id}
              title={project.title}
              short_description={project.short_description}
              image_url={project.thumbnail_url}
            />
          ))
        ) : (
          <p>No featured projects found.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
