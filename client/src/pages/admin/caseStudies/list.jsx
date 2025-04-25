import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../admin/admin.css";

function CaseList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/casestudies/getallcases`)
      .then((res) => res.json())
      .then((data) => {
        setCaseStudies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch case studies", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container"><p>Loading case studies...</p></div>;

  return (
    <div className="container">
      <div className="case-list-header">
        <h1>Case Studies</h1>
        <Link to="/admin/case/new" className="btn new-btn">+ New Case Study</Link>
      </div>

      {caseStudies.length === 0 ? (
        <p>No case studies found.</p>
      ) : (
        caseStudies.map((study) => (
          <div key={study._id} className="case-card">
            {study.thumbnail_url && (
              <img
                src={study.thumbnail_url}
                alt={study.title}
                className="thumbnail"
              />
            )}
            <div className="case-info">
              <h2>{study.title}</h2>
              <p><strong>Short Description:</strong> {study.short_description}</p>
              <p><strong>Tags:</strong> {Array.isArray(study.tags) ? study.tags.join(", ") : study.tags}</p>
              <p><strong>Tools Used:</strong> {Array.isArray(study.tools_used) ? study.tools_used.join(", ") : study.tools_used}</p>
              <p><strong>Featured:</strong> {study.featured ? "Yes" : "No"}</p>

              <div className="case-links">
                <Link to={`/admin/case/update/${study._id}`} className="btn">Update</Link>
                <Link to={`/admin/case/delete/${study._id}`} className="btn delete">Delete</Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CaseList;
