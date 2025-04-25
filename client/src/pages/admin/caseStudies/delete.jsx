import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../admin/admin.css";

function CaseDelete() {
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseUrl}/api/casestudies/getcasebyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCaseStudy(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch case study", err);
        setError("Failed to load case study.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/casestudies/deletecasestudy/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete case study");

      navigate("/admin/case/list"); // Redirect to list after delete
    } catch (err) {
      console.error(err);
      setError("Failed to delete case study.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!caseStudy) return <p>Case study not found.</p>;

  return (
    <div className="confirm-delete-page">
      <h1>Confirm Deletion</h1>
      <div className="case-card">
        {caseStudy.thumbnail_url && (
          <img src={caseStudy.thumbnail_url} alt={caseStudy.title} className="thumbnail" />
        )}
        <div className="case-info">
          <h2>{caseStudy.title}</h2>
          <p><strong>Short Description:</strong> {caseStudy.short_description}</p>
        </div>
      </div>

      <p>Are you sure you want to delete this case study?</p>

      <div className="delete-actions">
        <button onClick={handleDelete} className="btn delete">Yes, Delete</button>
        <Link to="/admin/case/list" className="btn">Cancel</Link>
      </div>
    </div>
  );
}

export default CaseDelete;
